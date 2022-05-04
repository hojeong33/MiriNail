package com.nail.backend.domain.review.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewUpdatePostReq")
@ToString
public class ReviewUpdatePostReq {

    @ApiModelProperty(value = "리뷰 seq")
    private Long reviewSeq;

    @ApiModelProperty(value = "리뷰 글 제목")
    private String reviewTitle;

    @ApiModelProperty(value = "리뷰 글 내용")
    private String reviewDesc;

    @ApiModelProperty(value = "리뷰 평점")
    private float reviewRating;
}
