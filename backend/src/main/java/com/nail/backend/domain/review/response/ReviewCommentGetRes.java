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
@ApiModel("ReviewCommentGetRes")
public class ReviewCommentGetRes {

    private Long reviewCommentSeq;
    private boolean reviewCommentIsDelete;

    private Long userSeq;
    private String userNickname;
    private String userProfileImg;

    private String reviewCommentDesc;
    private LocalDateTime reviewCommentRegedAt;

}
