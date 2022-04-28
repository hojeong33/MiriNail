package com.nail.backend.domain.community.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Long communitySeq;

    @ApiModelProperty(value = "유저 번호")
    private Long userSeq;

    @ApiModelProperty(value = "소통 게시판 글 제목")
    private String communityTitle;

    @ApiModelProperty(value = "소통 게시판 글 내용")
    private String communityDesc;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime communityRegedAt;

    @OneToMany(mappedBy = "community")
    private List<CommunityImg>  communityImg;

}
