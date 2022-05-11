package com.nail.backend.domain.review.response;

import com.nail.backend.domain.community.db.entity.CommunityImg;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.review.db.entity.ReviewImg;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewGetRes")
public class ReviewGetRes {

    private Long reviewSeq;
    private Nailart nailart;

    private Long userSeq;
    private String userNickname;
    private String userProfileImg;

    private Long designerSeq;
    private String designerNickname;
    private String designerProfileImg;
    private String shopName;

    private String reviewTitle;
    private String reviewDesc;
    private Long reviewCnt;
    private LocalDateTime reviewRegedAt;
    private float reviewRating;
    private List<ReviewImg> reviewImg;


    private List<ReviewCommentGetRes> reviewComments;
}
