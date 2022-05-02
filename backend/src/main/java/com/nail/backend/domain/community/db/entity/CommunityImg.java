package com.nail.backend.domain.community.db.entity;


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
@ApiModel(value = "CommunityImg", description = "소통 글 이미지")
public class CommunityImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityImgSeq;

    @JsonIgnore
    @JoinColumn(name = "community_seq")
    @ApiModelProperty(value = "소통 글 Seq")
    @ManyToOne
    private Community community;

    @ApiModelProperty(value = "리뷰 이미지 url")
    private String communityImgUrl;




}
