package com.nail.backend.domain.desinger.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class DesignerNewsListGetReq {
    @ApiModelProperty(value = "디자이너 id", example = "5", required = true)
    long designerSeq;
}
