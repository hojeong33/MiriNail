package com.nail.backend.domain.authentication.db.entity;

import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ApiModel(value = "DesignerApplication", description = "디자이너 등록 신청 정보")
public class DesignerApplication implements Serializable {

    @Id
    @ApiModelProperty(value = "유저 정보")
    @OneToOne
    @JoinColumn(name = "designer_seq")
    private User designerSeq;

    // 유저 포트폴리오
    @ApiModelProperty(value = "유저 포트폴리오 url")
    String designerPortfolio;

    // 유저 사업자 등록증
    @ApiModelProperty(value = "유저 사업자등록증 url")
    String designerCertification;

    // 디자이너 샵 이름
    @ApiModelProperty(value = "유저 디자이너 샵 이름")
    String designerShopName;

    // 디자이너 샵 주소
    @ApiModelProperty(value = "유저 디자이너 샵 주소")
    String designerAddress;

    // 인증 신청 상태
    @ApiModelProperty(value = "유저 인증신청 상태 default : true(진행중)이고 false 는 거절")
    boolean designerAuthStatus;

    // 인증신청 등록날짜
    @ApiModelProperty(value = "인증신청 등록날짜")
    @CreatedDate
    LocalDateTime designerRegedAt;
}
