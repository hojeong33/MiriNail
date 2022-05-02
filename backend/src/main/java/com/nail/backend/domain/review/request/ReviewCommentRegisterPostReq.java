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

    @ApiModelProperty(value = "리뷰 댓글 번호 - 대댓글 작성일 경우에만 ")
    private Long reviewCommentSeq;

    @ApiModelProperty(value = "리뷰 게시판 댓글 내용 ")
    private String reviewCommentDesc;

    @ApiModelProperty(value = "리뷰 게시판 댓글 계층  [1 - 대댓글이 없는 원댓글, 2 - 대댓글이 있는 원댓글 , 3 - 대댓글] ")
    private int reviewCommentLayer;

}
