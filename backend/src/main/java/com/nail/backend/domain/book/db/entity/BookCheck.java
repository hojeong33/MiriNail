package com.nail.backend.domain.book.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookCheck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB에 값 설정을 맡김
    @ApiModelProperty(value = "예약 스케줄 확인 번호")
    Long bookCheckSeq;

    @ApiModelProperty(value = "디자이너 번호")
    Long designerSeq;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ApiModelProperty(value = "예약 날짜")
    LocalDate bookCheckDate;

    @ApiModelProperty(value = "10시 00분")
    boolean am1000;

    @ApiModelProperty(value = "10시 30분")
    boolean am1030;

    @ApiModelProperty(value = "11시 00분")
    boolean am1100;

    @ApiModelProperty(value = "11시 30분")
    boolean am1130;

    @ApiModelProperty(value = "12시 00분")
    boolean pm1200;

    @ApiModelProperty(value = "12시 30분")
    boolean pm1230;

    @ApiModelProperty(value = "13시 00분")
    boolean pm1300;

    @ApiModelProperty(value = "13시 30분")
    boolean pm1330;

    @ApiModelProperty(value = "14시 00분")
    boolean pm1400;

    @ApiModelProperty(value = "14시 30분")
    boolean pm1430;

    @ApiModelProperty(value = "15시 00분")
    boolean pm1500;

    @ApiModelProperty(value = "15시 30분")
    boolean pm1530;

    @ApiModelProperty(value = "16시 00분")
    boolean pm1600;

    @ApiModelProperty(value = "16시 30분")
    boolean pm1630;

    @ApiModelProperty(value = "17시 00분")
    boolean pm1700;

    @ApiModelProperty(value = "17시 30분")
    boolean pm1730;

    @ApiModelProperty(value = "18시 00분")
    boolean pm1800;

    @ApiModelProperty(value = "18시 30분")
    boolean pm1830;

    @ApiModelProperty(value = "19시 00분")
    boolean pm1900;
}
