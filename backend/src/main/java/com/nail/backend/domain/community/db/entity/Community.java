package com.nail.backend.domain.community.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@ApiModel(value = "Community", description = "소통게시판")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_seq")
    private Long communitySeq;

    @ApiModelProperty(value = "유저 번호")
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    private User user;

    @ApiModelProperty(value = "소통 게시판 글 제목")
    private String communityTitle;

    @ApiModelProperty(value = "소통 게시판 글 내용")
    private String communityDesc;

    @ApiModelProperty(value = "소통 게시판 글 조회수")
    private Long communityCnt;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime communityRegedAt;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL)
    private List<CommunityImg>  communityImg;

}
