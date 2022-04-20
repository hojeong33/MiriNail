package com.nail.backend.domain.user.db.entity;

import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ApiModel(value = "User", description = "회원 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class User {
    @ApiModelProperty(value = "회원 id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long userSeq;

    @ApiModelProperty(value = "카카오에서 쓰이는 회원 id")
    @Column(name = "user_id", unique = true)
    @NotNull
    String userId;

    // 이메일
    @ApiModelProperty(value = "회원 이메일")
    String userEmail;

    // 닉네임
    @ApiModelProperty(value="회원 닉네임")
    String userNickname;

    // 전화번호
    @ApiModelProperty(value="회원 전화번호")
    String userTel;

    // 회원 구분
    @ApiModelProperty(value = "회원 구분 코드 (" +
            "ROLE_ADMIN : 사이트 관리자, " +
            "ROLE_USER : 일반회원 (default), " +
            "ROLE_ARTIST : 아티스트")
    String userRole;

    // 성별
    @ApiModelProperty(value="회원 성별")
    String userGender;

    // 연령대
    @ApiModelProperty(value="회원 연령대")
    String userAgeRange;

    //프로필 이미지
    @ApiModelProperty(value="회원 프로필 이미지")
    String userProfileImg;

    // 회원가입 날짜
    @ApiModelProperty(value="회원 가입날짜")
    @CreatedDate
    LocalDateTime userRegedAt;

}
