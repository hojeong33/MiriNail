package com.nail.backend.domain.review.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ReviewRegisterPostReq")
@ToString
public class ReviewRegisterPostReq {

    @ApiModelProperty(value = "리뷰 글 제목")
    private String reviewTitle;

    @ApiModelProperty(value = "리뷰 글 내용")
    private String reviewDesc;

    @ApiModelProperty(value = "리뷰 작품 seq")
    private Long nailartSeq;

    @ApiModelProperty(value = "리뷰 디자이너 seq")
    private Long designerSeq;


    @ApiModelProperty(value = "리뷰 평점")
    private float reviewRating;
}
