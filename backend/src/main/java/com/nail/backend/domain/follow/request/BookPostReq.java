package com.nail.backend.domain.follow.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel(value = "BookPostReq", description = "예약 등록시 필요한 정보")
public class BookPostReq {

    // 유저 번호
    @ApiModelProperty(value = "유저 번호", example = "1")
    Long userSeq;

    // 디자이너 번호
    @ApiModelProperty(value = "디자이너의 유저 번호", example = "2")
    Long designerSeq;

    // 작품 번호
    @ApiModelProperty(value = "네일아트 번호", example = "1")
    Long nailartSeq;

    // 예약 날짜 및 시간
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @ApiModelProperty(value = "예약 날짜 및 시간")
    LocalDateTime bookDatetime;

    // 예약 코멘트
    @ApiModelProperty(value = "예약 코멘트", example = "상담후에 시술 결정하고 싶어요.")
    String bookComment;
}
