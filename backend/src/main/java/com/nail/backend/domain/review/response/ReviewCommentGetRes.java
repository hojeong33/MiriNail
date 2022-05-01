package com.nail.backend.domain.review.response;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewGetCommentRes")
public class ReviewCommentGetRes {

    private Long reviewCommentSeq;

    private Long userSeq;
    private String userNickname;
    private String userProfileImg;

    private String reviewCommentDesc;
    private Long reviewGroupNum;
    private int reviewCommentLayer;
    private LocalDateTime reviewCommentRegedAt;

}
