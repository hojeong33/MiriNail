package com.nail.backend.domain.review.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewCommentModifyPutReq")
public class ReviewCommentModifyPutReq {

    @ApiModelProperty(value = "리뷰 댓글 번호")
    Long reviewCommentSeq;

    @ApiModelProperty(value = "리뷰 댓글 내용")
    String reviewCommentDesc;
}
