package com.nail.backend.domain.desinger.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

public class DesignerNewsRegisterPostReq {
    @ApiModelProperty(value = "디자이너 seq", example = "5", required = true)
    long designerSeq;

    @ApiModelProperty(value = "새 소식 제목", example = "신상품 입고!", required = true)
    String designerNewsTitle;

    @ApiModelProperty(value = "새 소식 내용", example = "새로운 상품이 ..", required = true)
    String designerNewsDesc;

    // 디자이너 뉴스 생성일

    // 디자이너 뉴스 이미지
}
