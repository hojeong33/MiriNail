package com.nail.backend.domain.user.db.entity;

import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FittingImg {
    @ApiModelProperty(value = "피팅 이미지 seq")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long fittingImgSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    @ApiModelProperty(value = "유저 정보")
    User user;

    @ApiModelProperty(value = "피팅 이미지 정보")
    String fittingImgUrl;
}
