package com.nail.backend.domain.review.service;


import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.review.db.entity.ReviewComment;
import com.nail.backend.domain.review.request.ReviewCommentModifyPutReq;
import com.nail.backend.domain.review.request.ReviewCommentRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewRegisterPostReq;
import com.nail.backend.domain.review.response.ReviewGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    //    CREATE_________________________________________
    Review reviewRegister(List<MultipartFile> reviewFiles, ReviewRegisterPostReq reviewRegisterPostReq, String userId) throws IOException;
    ReviewComment reviewCommentRegister(ReviewCommentRegisterPostReq reviewCommentRegisterPostReq, String userId);


//    READ___________________________________________
    Page<ReviewGetRes> getReviewListByNailartSeq(Pageable pageable,Long nailartSeq);
    Page<ReviewGetRes> getReviewListByUser(Pageable pageable,Long userSeq);
    Page<ReviewGetRes> getReviewListByDesignerSeq(Pageable pageable,Long designerSeq);

    List<ReviewGetRes> getTop10ReviewList();

    //    UPDATE_________________________________________
    Long reviewCommentModify(ReviewCommentModifyPutReq reviewCommentModifyPutReq);

//    DELETE_________________________________________
    boolean reviewRemove(Long reviewSeq);
    boolean reviewCommentRemove(Long reviewCommentSeq);
}
