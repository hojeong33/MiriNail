package com.nail.backend.domain.review.service;


import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.review.db.entity.ReviewComment;
import com.nail.backend.domain.review.request.ReviewCommentRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewRegisterPostReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    //    CREATE_________________________________________
    Review reviewRegister(List<MultipartFile> reviewFiles, ReviewRegisterPostReq reviewRegisterPostReq, String userId) throws IOException;
    ReviewComment reviewCommentRegister(ReviewCommentRegisterPostReq reviewCommentRegisterPostReq, String userId);


//    READ___________________________________________
//    UPDATE_________________________________________

//    DELETE_________________________________________
    boolean reviewRemove(Long reviewSeq);
    boolean reviewCommentRemove(Long reviewCommentSeq);
}
