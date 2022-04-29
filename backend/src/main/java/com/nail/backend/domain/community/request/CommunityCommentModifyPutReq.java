package com.nail.backend.domain.community.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommunityCommentModifyPutReq")
public class CommunityCommentModifyPutReq {

    @ApiModelProperty(value = "커뮤니티 댓글 번호")
    Long communityCommentSeq;

    @ApiModelProperty(value = "커뮤니티 댓글 내용")
    String communityCommentDesc;
}
