package com.nail.backend.domain.authentication.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ArtistRegisterPostReq")
public class ArtistRegisterPostReq {

    // 디자이너 샵 이름
    @ApiModelProperty(value = "유저 디자이너 샵 이름")
    String designerShopName;

    // 디자이너 샵 주소
    @ApiModelProperty(value = "유저 디자이너 샵 주소")
    String designerAddress;

    // 디자이너 전화번호
    @ApiModelProperty(value = "디자이너 전화번호")
    String designerTel;
}
