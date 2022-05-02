package com.nail.backend.domain.favorite.db.entity;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "nailart_seq", referencedColumnName = "nailart_seq")
    @ApiModelProperty(value ="네일아트 seq")
    Nailart nailart;

}
