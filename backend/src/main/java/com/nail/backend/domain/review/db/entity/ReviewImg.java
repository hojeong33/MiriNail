package com.nail.backend.domain.review.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(value = "reviewImg", description = "리뷰 이미지")
public class ReviewImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewImgSeq;

    @ApiModelProperty(value = "리뷰 글 Seq")
    private Long reviewSeq;

    @ApiModelProperty(value = "리뷰 img url")
    private String reviewImgUrl;

}
