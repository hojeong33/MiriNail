package com.nail.backend.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "LoginPostRes", description = "로그인 시 필요한 정보")
public class LoginPostReq {
    @ApiModelProperty(value = "유저 이메일 주소", example = "abc@abc.com")
    String userEmail;
}
