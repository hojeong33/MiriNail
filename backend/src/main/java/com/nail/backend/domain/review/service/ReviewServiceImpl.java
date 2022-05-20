package com.nail.backend.domain.review.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.nailart.db.repository.NailartRepositorySupport;
import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.review.db.entity.ReviewComment;
import com.nail.backend.domain.review.db.entity.ReviewImg;
import com.nail.backend.domain.review.db.repository.*;
import com.nail.backend.domain.review.request.ReviewCommentModifyPutReq;
import com.nail.backend.domain.review.request.ReviewCommentRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewUpdatePostReq;
import com.nail.backend.domain.review.response.ReviewCommentGetRes;
import com.nail.backend.domain.review.response.ReviewGetRes;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    ReviewRepositorySupport reviewRepositorySupport;

    @Autowired
    ReviewCommentRepository reviewCommentRepository;

    @Autowired
    ReviewCommentRepositorySupport reviewCommentRepositorySupport;

    @Autowired
    ReviewImgRepository reviewImgRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    NailartRepositorySupport nailartRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DesignerInfoRepository designerInfoRepository;

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
                        .reviewSeq(saveReview.getReviewSeq())
                        .reviewImgUrl(reviewFileUrl)
                        .build();

                reviewImgRepository.save(reviewImg);

            }

        }

        // 전체 리뷰 평점 수정

        double avgRate = reviewRepositorySupport.getAvgRate(reviewRegisterPostReq.getNailartSeq());

        nailartRepositorySupport.modifyRatingByNailartSeq((float) avgRate,saveReview.getNailart().getNailartSeq());

        return saveReview;
    }

    public ReviewComment reviewCommentRegister(ReviewCommentRegisterPostReq reviewCommentRegisterPostReq,
                                               String userId){
        User user = userRepository.findByUserId(userId);
        Review review = reviewRepository.findByReviewSeq(reviewCommentRegisterPostReq.getReviewSeq());



            ReviewComment reviewComment = ReviewComment.builder()
                    .reviewSeq(review.getReviewSeq())
                    .user(user)
                    .reviewCommentDesc(reviewCommentRegisterPostReq.getReviewCommentDesc())
                    .reviewCommentRegedAt(LocalDateTime.now())
                    .build();

            ReviewComment res = reviewCommentRepository.save(reviewComment);

            return res;

    }

    // 조회수 증가
    public Long reviewCntPlus(Long reviewSeq){
        return reviewRepositorySupport.modifyReviewCnt(reviewSeq);
    }


//    READ___________________________________________
// 네일아트 리뷰 조회
public Page<ReviewGetRes> getReviewListByNailartSeq(Pageable pageable,Long nailartSeq, int type) {

    if (type == 1) {
        // 최신순
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeq(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for (ReviewComment rc : reviewCommentList) {

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerNickname(rv.getDesigner().getUserNickname())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }
        Page<ReviewGetRes> res = new PageImpl<>(reviewGetResList, pageable, total);


        return res;
    } else if (type == 2) {
        // 평점순
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeqOrderByReviewRatingDesc(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for (ReviewComment rc : reviewCommentList) {

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerNickname(rv.getDesigner().getUserNickname())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }
        Page<ReviewGetRes> res = new PageImpl<>(reviewGetResList, pageable, total);


        return res;
    } else {
        // 조회순
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeqOrderByReviewCntDesc(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for (ReviewComment rc : reviewCommentList) {

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerNickname(rv.getDesigner().getUserNickname())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }
        Page<ReviewGetRes> res = new PageImpl<>(reviewGetResList, pageable, total);


        return res;
    }
}


    // 유저가 작성한 글 전체조회
    public Page<ReviewGetRes> getReviewListByUser(Pageable pageable, Long userSeq){
        Page<Review> reviewList = reviewRepository.findAllByUser_UserSeq(pageable,userSeq);
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for(ReviewComment rc : reviewCommentList){

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(rv.getDesigner().getUserSeq());
            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .nailart(rv.getNailart())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .shopName(designerInfo.getDesignerShopName())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }
        Page<ReviewGetRes> res = new PageImpl<>(reviewGetResList, pageable, total);


        return res;
    }


    // 디자이너에게 작성된 리뷰 전체조회
    public Page<ReviewGetRes> getReviewListByDesignerSeq(Pageable pageable, Long designerSeq){
        Page<Review> reviewList = reviewRepository.findAllByDesigner_UserSeq(pageable,designerSeq);
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for(ReviewComment rc : reviewCommentList){

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .nailart(rv.getNailart())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerNickname(rv.getDesigner().getUserNickname())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }
        Page<ReviewGetRes> res = new PageImpl<>(reviewGetResList, pageable, total);


        return res;
    }


    // Top10 리뷰 전체조회
    public List<ReviewGetRes> getTop10ReviewList(){
        List<Review> reviewList = reviewRepository.findTop10ByOrderByReviewCntDesc();
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        for (Review rv : reviewList) {

            // 댓글
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // 댓글 리턴 리스트 만들기
            for(ReviewComment rc : reviewCommentList){

                ReviewCommentGetRes reviewCommentGetRes = ReviewCommentGetRes.builder()
                        .reviewCommentIsDelete(rc.isReviewCommentIsDelete())
                        .userSeq(rc.getUser().getUserSeq())
                        .userNickname(rc.getUser().getUserNickname())
                        .userProfileImg(rc.getUser().getUserProfileImg())
                        .reviewCommentSeq(rc.getReviewCommentSeq())
                        .reviewCommentDesc(rc.getReviewCommentDesc())
                        .reviewCommentRegedAt(rc.getReviewCommentRegedAt())
                        .build();
                reviewCommentGetResList.add(reviewCommentGetRes);
            }

            // 이미지
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // 리뷰 전체 리턴 리스트 만들기
            ReviewGetRes reviewGetRes = ReviewGetRes.builder()
                    .reviewSeq(rv.getReviewSeq())
                    .nailart(rv.getNailart())
                    .userSeq(rv.getUser().getUserSeq())
                    .userNickname(rv.getUser().getUserNickname())
                    .userProfileImg(rv.getUser().getUserProfileImg())
                    .designerSeq(rv.getDesigner().getUserSeq())
                    .designerNickname(rv.getDesigner().getUserNickname())
                    .designerProfileImg(rv.getDesigner().getUserProfileImg())
                    .reviewTitle(rv.getReviewTitle())
                    .reviewDesc(rv.getReviewDesc())
                    .reviewCnt(rv.getReviewCnt())
                    .reviewRegedAt(rv.getReviewRegedAt())
                    .reviewRating(rv.getReviewRating())
                    .reviewImg(reviewImgList)
                    .reviewComments(reviewCommentGetResList)
                    .build();
            reviewGetResList.add(reviewGetRes);
        }

        return reviewGetResList;
    }
//    UPDATE_________________________________________
    public Review reviewUpdate(List<MultipartFile> reviewFiles,
                                 ReviewUpdatePostReq reviewUpdatePostReq,
                                 String userId) throws IOException {
        Review review = reviewRepository.findByReviewSeq(reviewUpdatePostReq.getReviewSeq());

        //작성자 일치 할 때
        if(review.getUser().getUserId().equals(userId)){
            //리뷰 데이터 변경
            reviewRepositorySupport.modifyReview(reviewUpdatePostReq);
            review = reviewRepository.findByReviewSeq(reviewUpdatePostReq.getReviewSeq());
            //파일 처리
            // 기존 파일 url 삭제
            reviewImgRepository.deleteAllByReviewSeq(reviewUpdatePostReq.getReviewSeq());
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
                            .reviewSeq(review.getReviewSeq())
                            .reviewImgUrl(reviewFileUrl)
                            .build();

                    reviewImgRepository.save(reviewImg);

                }

            }

        }
        // 전체 리뷰 평점 수정
        double avgRate = reviewRepositorySupport.getAvgRate(review.getNailart().getNailartSeq());
        nailartRepositorySupport.modifyRatingByNailartSeq((float) avgRate,review.getNailart().getNailartSeq());

        return review;
    }


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
