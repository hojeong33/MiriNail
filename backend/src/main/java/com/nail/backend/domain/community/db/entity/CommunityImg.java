package com.nail.backend.domain.community.db.entity;


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
@ApiModel(value = "QnA Answer", description = "문의 답변")
public class CommunityImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityImgSeq;

    @JoinColumn(name = "community_seq")
    @ApiModelProperty(value = "소통 글 Seq")
    private Long communitySeq;

    @ApiModelProperty(value = "소통 글 Seq")
    private String communityImgUrl;

}
