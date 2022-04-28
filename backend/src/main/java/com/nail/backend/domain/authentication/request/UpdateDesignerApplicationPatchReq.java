package com.nail.backend.domain.authentication.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UpdateDesignerApplicationPatchReq")
public class UpdateDesignerApplicationPatchReq {
    // 인증신청 수락 여부
    @ApiModelProperty(value = "인증신청 수락 여부")
    boolean isAccepted;

    // 처리할 인증신청 등록한 유저 번호
    @ApiModelProperty(value = "인증시청 등록한 유저 번호")
    Long designerSeq;
}
