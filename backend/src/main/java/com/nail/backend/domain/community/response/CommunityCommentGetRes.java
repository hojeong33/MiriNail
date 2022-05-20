package com.nail.backend.domain.community.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommunityCommentGetRes")
public class CommunityCommentGetRes {

    private Long communityCommentSeq;
    private boolean communityCommentIsDelete;
    private boolean communityCommentLayerExist;

    private Long userSeq;
    private String userNickname;
    private String userProfileImg;

    private String communityCommentDesc;
    private Long communityGroupNum;
    private int communityCommentLayer;
    private int communityCommentLayerCnt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime communityCommentRegedAt;

}