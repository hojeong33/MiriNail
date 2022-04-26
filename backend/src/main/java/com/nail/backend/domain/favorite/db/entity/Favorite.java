package com.nail.backend.domain.favorite.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@ApiModel(value ="Favorite", description = "좋아요 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long favoriteSeq;

    @ApiModelProperty(value = "유저 Seq")
    Long userSeq;

    @ApiModelProperty(value ="네일아트 seq")
    Long nailartSeq;

}
