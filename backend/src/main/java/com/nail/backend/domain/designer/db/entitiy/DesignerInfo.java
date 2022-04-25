package com.nail.backend.domain.designer.db.entitiy;

import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "designer_info")
public class DesignerInfo implements Serializable {

    @Id
    @Column(name = "designer_seq")
    Long designerSeq;

    @MapsId
    @ApiModelProperty(value = "유저 정보")
    @OneToOne
    @JoinColumn(name = "designer_seq")
    private User user;

    // 유저 포트폴리오
    @ApiModelProperty(value = "유저 포트폴리오 url")
    String designerPortfolioUrl;

    // 유저 사업자 등록증
    @ApiModelProperty(value = "유저 사업자등록증 url")
    String designerCertificationUrl;

    // 디자이너 샵 이름
    @ApiModelProperty(value = "유저 디자이너 샵 이름")
    String designerShopName;

    // 디자이너 샵 주소
    @ApiModelProperty(value = "유저 디자이너 샵 주소")
    String designerAddress;

    // 인증신청 등록날짜
    @ApiModelProperty(value = "인증신청 등록날짜")
    @CreatedDate
    LocalDateTime designerRegedAt;
}
