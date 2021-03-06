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


        //?????? ??????

        if(!reviewFiles.isEmpty()){
            for (MultipartFile f : reviewFiles ) {

                // file ?????????
                String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                //?????? ?????? ??????
                //        System.getProperty => ????????? ????????? ?????? ????????? ?????? ??? ??????. (user.dir = ?????? ?????? ??????????????? ?????????)
                File file = new File(System.getProperty("user.dir")+ fileName);

                //?????? ??????
                f.transferTo(file);

                //S3 ?????? ?????????
                awsS3Service.uploadOnS3(fileName, file);

                //?????? ??????
                String reviewFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                //?????? ??????
                file.delete();


                // ??????????????? ?????? ????????? insert
                ReviewImg reviewImg = ReviewImg.builder()
                        .reviewSeq(saveReview.getReviewSeq())
                        .reviewImgUrl(reviewFileUrl)
                        .build();

                reviewImgRepository.save(reviewImg);

            }

        }

        // ?????? ?????? ?????? ??????

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

    // ????????? ??????
    public Long reviewCntPlus(Long reviewSeq){
        return reviewRepositorySupport.modifyReviewCnt(reviewSeq);
    }


//    READ___________________________________________
// ???????????? ?????? ??????
public Page<ReviewGetRes> getReviewListByNailartSeq(Pageable pageable,Long nailartSeq, int type) {

    if (type == 1) {
        // ?????????
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeq(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // ?????? ?????? ?????? ????????? ?????????
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
        // ?????????
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeqOrderByReviewRatingDesc(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // ?????? ?????? ?????? ????????? ?????????
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
        // ?????????
        Page<Review> reviewList = reviewRepository.findAllByNailart_NailartSeqOrderByReviewCntDesc(pageable, nailartSeq);

        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // ?????? ?????? ?????? ????????? ?????????
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


    // ????????? ????????? ??? ????????????
    public Page<ReviewGetRes> getReviewListByUser(Pageable pageable, Long userSeq){
        Page<Review> reviewList = reviewRepository.findAllByUser_UserSeq(pageable,userSeq);
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(rv.getDesigner().getUserSeq());
            // ?????? ?????? ?????? ????????? ?????????
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


    // ?????????????????? ????????? ?????? ????????????
    public Page<ReviewGetRes> getReviewListByDesignerSeq(Pageable pageable, Long designerSeq){
        Page<Review> reviewList = reviewRepository.findAllByDesigner_UserSeq(pageable,designerSeq);
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        long total = reviewList.getTotalElements();
        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // ?????? ?????? ?????? ????????? ?????????
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


    // Top10 ?????? ????????????
    public List<ReviewGetRes> getTop10ReviewList(){
        List<Review> reviewList = reviewRepository.findTop10ByOrderByReviewCntDesc();
        List<ReviewGetRes> reviewGetResList = new ArrayList<>();

        for (Review rv : reviewList) {

            // ??????
            List<ReviewComment> reviewCommentList = reviewCommentRepository.findAllByReviewSeq(rv.getReviewSeq());
            List<ReviewCommentGetRes> reviewCommentGetResList = new ArrayList<>();

            // ?????? ?????? ????????? ?????????
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

            // ?????????
            List<ReviewImg> reviewImgList = reviewImgRepository.findAllByReviewSeq(rv.getReviewSeq());

            // ?????? ?????? ?????? ????????? ?????????
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

        //????????? ?????? ??? ???
        if(review.getUser().getUserId().equals(userId)){
            //?????? ????????? ??????
            reviewRepositorySupport.modifyReview(reviewUpdatePostReq);
            review = reviewRepository.findByReviewSeq(reviewUpdatePostReq.getReviewSeq());
            //?????? ??????
            // ?????? ?????? url ??????
            reviewImgRepository.deleteAllByReviewSeq(reviewUpdatePostReq.getReviewSeq());
            if(!reviewFiles.isEmpty()){
                for (MultipartFile f : reviewFiles ) {

                    // file ?????????
                    String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                    //?????? ?????? ??????
                    //        System.getProperty => ????????? ????????? ?????? ????????? ?????? ??? ??????. (user.dir = ?????? ?????? ??????????????? ?????????)
                    File file = new File(System.getProperty("user.dir")+ fileName);

                    //?????? ??????
                    f.transferTo(file);

                    //S3 ?????? ?????????
                    awsS3Service.uploadOnS3(fileName, file);

                    //?????? ??????
                    String reviewFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                    //?????? ??????
                    file.delete();


                    // ??????????????? ?????? ????????? insert
                    ReviewImg reviewImg = ReviewImg.builder()
                            .reviewSeq(review.getReviewSeq())
                            .reviewImgUrl(reviewFileUrl)
                            .build();

                    reviewImgRepository.save(reviewImg);

                }

            }

        }
        // ?????? ?????? ?????? ??????
        double avgRate = reviewRepositorySupport.getAvgRate(review.getNailart().getNailartSeq());
        nailartRepositorySupport.modifyRatingByNailartSeq((float) avgRate,review.getNailart().getNailartSeq());

        return review;
    }


    @Override
    @Transactional
    public Long reviewCommentModify(ReviewCommentModifyPutReq reviewCommentModifyPutReq){

        //?????? ????????? ???????????? ??????, ???????????? ????????? 0 ??????
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
