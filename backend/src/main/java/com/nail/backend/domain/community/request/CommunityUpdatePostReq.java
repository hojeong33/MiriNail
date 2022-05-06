package com.nail.backend.domain.community.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommunityUpdatePostReq")
@ToString
public class CommunityUpdatePostReq {

    @ApiModelProperty(value = "커뮤니티 글 seq")
    private Long communitySeq;


    @ApiModelProperty(value = "커뮤니티 글 제목")
    private String communityTitle;


    @ApiModelProperty(value = "커뮤니티 글 내용")
    private String communityDesc;

}
