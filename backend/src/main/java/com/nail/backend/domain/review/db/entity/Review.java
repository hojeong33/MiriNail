package com.nail.backend.domain.review.db.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@ApiModel(value = "Review", description = "리뷰게시판")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    @ApiModelProperty(value = "유저 번호")
    private User user;

    @ManyToOne(targetEntity = Nailart.class)
    @JoinColumn(name = "nailart_seq")
    @ApiModelProperty(value = "작품 seq")
    private Nailart nailart;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "designer_seq")
    @ApiModelProperty(value = "리뷰 디자이너")
    private User designer;

    @ApiModelProperty(value = "리뷰 게시판 글 제목")
    private String reviewTitle;

    @ApiModelProperty(value = "리뷰 게시판 글 내용")
    private String reviewDesc;

    @ApiModelProperty(value = "리뷰 게시판 글 조회수")
    private Long reviewCnt;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime reviewRegedAt;

    @ApiModelProperty(value = "리뷰 총 평점")
    private float reviewRating;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ReviewImg> reviewImg;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ReviewComment> reviewComment;

}
