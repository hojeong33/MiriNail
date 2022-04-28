package com.nail.backend.domain.book.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(value = AuditingEntityListener.class)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에 값 설정을 맡김
    @ApiModelProperty(value = "예약 번호")
    Long bookSeq;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_seq")
    @ApiModelProperty(value = "유저 번호")
    User user;

    @ManyToOne
    @JoinColumn(name = "designer_seq")
    @ApiModelProperty(value = "디자이너 번호")
    DesignerInfo designerInfo;

    @ManyToOne
    @JoinColumn(name = "nailart_seq")
    @ApiModelProperty(value = "작품 번호")
    Nailart nailart;

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "예약 날짜 및 시간")
    LocalDateTime bookDatetime;

    @ApiModelProperty(value = "예약 코멘트")
    String bookComment;

    @CreatedDate
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @ApiModelProperty(value = "예약 등록한 날짜")
    LocalDateTime bookRegedAt;
}
