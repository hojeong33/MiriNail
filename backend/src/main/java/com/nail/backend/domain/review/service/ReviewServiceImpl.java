package com.nail.backend.domain.review.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.review.db.entity.ReviewComment;
import com.nail.backend.domain.review.db.entity.ReviewImg;
import com.nail.backend.domain.review.db.repository.ReviewCommentRepository;
import com.nail.backend.domain.review.db.repository.ReviewCommentRepositorySupport;
import com.nail.backend.domain.review.db.repository.ReviewImgRepository;
import com.nail.backend.domain.review.db.repository.ReviewRepository;
import com.nail.backend.domain.review.request.ReviewCommentModifyPutReq;
import com.nail.backend.domain.review.request.ReviewCommentRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewRegisterPostReq;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {


    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    ReviewCommentRepository reviewCommentRepository;

    @Autowired
    ReviewCommentRepositorySupport reviewCommentRepositorySupport;

    @Autowired
    ReviewImgRepository reviewImgRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    UserRepository userRepository;
    //    CREATE_________________________________________
    public Review reviewRegister(List<MultipartFile> reviewFiles,
                                    ReviewRegisterPostReq reviewRegisterPostReq,
                                    String userId) throws IOException {

        User user = userRepository.findByUserId(userId);
        Nailart nailart = nailartRepository.findByNailartSeq(reviewRegisterPostReq.getNailartSeq());
        User designer = userRepository.findByUserSeq(reviewRegisterPostReq.getDesignerSeq());

        Review review = Review.builder()
                .user(user)
                .nailart(nailart)
                .designer(designer)
                .reviewTitle(reviewRegisterPostReq.getReviewTitle())
                .reviewDesc(reviewRegisterPostReq.getReviewDesc())
                .reviewCnt(0L)
                .reviewRegedAt(LocalDateTime.now())
                .reviewRating(reviewRegisterPostReq.getReviewRating())
                .build();

        Review saveReview = reviewRepository.save(review);


        //파일 처리

        if(!reviewFiles.isEmpty()){
            for (MultipartFile f : reviewFiles ) {

                // file 업로드
                String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                //파일 객체 생성
                //        System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
                File file = new File(System.getProperty("user.dir")+ fileName);

                //파일 저장
                f.transferTo(file);

                //S3 파일 업로드
                awsS3Service.uploadOnS3(fileName, file);

                //주소 할당
                String reviewFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                //파일 삭제
                file.delete();


                // 리뷰게시판 파일 테이블 insert


                ReviewImg reviewImg = ReviewImg.builder()
                        .review(saveReview)
                        .reviewImgUrl(reviewFileUrl)
                        .build();

                reviewImgRepository.save(reviewImg);

            }

        }

        return saveReview;
    }

    public ReviewComment reviewCommentRegister(ReviewCommentRegisterPostReq reviewCommentRegisterPostReq,
                                               String userId){
        Review review = reviewRepository.findById(reviewCommentRegisterPostReq.getReviewSeq()).orElse(null);
        User user = userRepository.findByUserId(userId);

        if(reviewCommentRegisterPostReq.getReviewCommentLayer() == 1){
            // 댓글 작성 layer == 1 일 경우
            ReviewComment reviewComment = ReviewComment.builder()
                    .review(review)
                    .user(user)
                    .reviewCommentDesc(reviewCommentRegisterPostReq.getReviewCommentDesc())
                    .reviewCommentLayer(reviewCommentRegisterPostReq.getReviewCommentLayer())
                    .reviewCommentRegedAt(LocalDateTime.now())
                    .build();

            ReviewComment res = reviewCommentRepository.save(reviewComment);

            reviewCommentRepositorySupport.setCommentGroup(res.getReviewCommentSeq());
            return res;

        }else{
            // 대댓글 작성
            ReviewComment reviewComment = ReviewComment.builder()
                    .review(review)
                    .user(user)
                    .reviewCommentDesc(reviewCommentRegisterPostReq.getReviewCommentDesc())
                    .reviewGroupNum(reviewCommentRegisterPostReq.getReviewCommentSeq())
                    .reviewCommentLayer(reviewCommentRegisterPostReq.getReviewCommentLayer())
                    .reviewCommentRegedAt(LocalDateTime.now())
                    .build();

            ReviewComment res = reviewCommentRepository.save(reviewComment);

            //원댓글에 대댓글 있다는표시 -  layer2로 변경
            if(reviewCommentRepository.findById(reviewCommentRegisterPostReq.getReviewCommentSeq())
                    .get().getReviewCommentLayer() == 1){
                reviewCommentRepositorySupport.modifyCommentLayer(reviewCommentRegisterPostReq.getReviewCommentSeq());
            }
            return res;

        }

    }

//    READ___________________________________________
//    UPDATE_________________________________________

    @Override
    @Transactional
    public Long reviewCommentModify(ReviewCommentModifyPutReq reviewCommentModifyPutReq){

        //해당 댓글이 존재하면 수정, 존재하지 않으면 0 반환
        if(reviewCommentRepository.findById(reviewCommentModifyPutReq.getReviewCommentSeq()).isPresent()){
            Long execute = reviewCommentRepositorySupport.updateReviewCommentByCommentSeq(reviewCommentModifyPutReq);
            return execute;
        }
        else return 0L;

    }

//    DELETE_________________________________________


    public boolean reviewRemove(Long reviewSeq){

        if(reviewRepository.findById(reviewSeq).isPresent()){
            reviewRepository.deleteById(reviewSeq);
            return true;
        }
        return false;

    }

    public boolean reviewCommentRemove(Long reviewSeq){

        reviewCommentRepositorySupport.deleteReviewComment(reviewSeq);

        return true;

    }
}
