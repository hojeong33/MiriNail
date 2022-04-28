package com.nail.backend.domain.community.db.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@ApiModel(value = "CommunityComment", description = "소통게시판 댓글")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
public class CommunityComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityCommentSeq;

    @ApiModelProperty(value = "커뮤니티 글 ")
    @ManyToOne(targetEntity = Community.class)
    @JoinColumn(name = "community_seq")
    private Community community;

    @ApiModelProperty(value = "유저 번호")
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @ApiModelProperty(value = "커뮤니티 게시판 댓글 내용 ")
    private String communityCommentDesc;

    @ApiModelProperty(value = "커뮤니티 게시판 댓글 그룹 ")
    private Long communityGroupNum;

    @ApiModelProperty(value = "커뮤니티 게시판 댓글 계층 ")
    private int communityCommentLayer;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime communityCommentRegedAt;
}
