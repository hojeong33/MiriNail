package com.nail.backend.domain.review.db.entity;


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
@ApiModel(value = "ReviewComment", description = "리뷰게시판 댓글")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
public class ReviewComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewCommentSeq;

    @ApiModelProperty(value = "리뷰 글 ")
    private Long reviewSeq;

    @ApiModelProperty(value = "유저 번호")
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @ApiModelProperty(value = "리뷰 게시판 댓글 내용 ")
    private String reviewCommentDesc;

    @ApiModelProperty(value = "리뷰 게시판 댓글 삭제여부 ")
    private boolean reviewCommentIsDelete;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime reviewCommentRegedAt;
}
