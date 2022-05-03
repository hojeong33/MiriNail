package com.nail.backend.domain.community.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nail.backend.domain.community.controller.CommunityController;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.db.entity.CommunityImg;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("CommunityGetRes")
public class CommunityGetRes {

    private Long communitySeq;
    private Long userSeq;
    private String userNickname;
    private String userProfileImg;
    private String communityTitle;
    private String communityDesc;
    private Long communityCnt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime communityRegedAt;
    private List<CommunityImg> communityImg;

}
