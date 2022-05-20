package com.nail.backend.domain.review.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewCommentRegisterPostReq")
@ToString
public class ReviewCommentRegisterPostReq {

    @ApiModelProperty(value = "리뷰 글 번호")
    private Long reviewSeq;

    @ApiModelProperty(value = "리뷰 게시판 댓글 내용 ")
    private String reviewCommentDesc;


}
