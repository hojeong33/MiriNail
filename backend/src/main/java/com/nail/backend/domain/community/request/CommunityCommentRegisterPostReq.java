package com.nail.backend.domain.community.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommunityCommentRegisterPostReq")
@ToString
public class CommunityCommentRegisterPostReq {


    @ApiModelProperty(value = "커뮤니티 글 번호")
    private Long communitySeq;

    @ApiModelProperty(value = "커뮤니티 댓글 번호 - 대댓글 작성일 경우에만 ")
    private Long communityCommentSeq;

    @ApiModelProperty(value = "커뮤니티 게시판 댓글 내용 ")
    private String communityCommentDesc;

    @ApiModelProperty(value = "커뮤니티 게시판 댓글 계층  [1 - 대댓글이 없는 원댓글, 2 - 대댓글이 있는 원댓글 , 3 - 대댓글] ")
    private int communityCommentLayer;
}
