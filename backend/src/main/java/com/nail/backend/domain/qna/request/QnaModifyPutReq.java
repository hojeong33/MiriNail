package com.nail.backend.domain.qna.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("QnaModifyPutReq")
public class QnaModifyPutReq {

    @ApiModelProperty(value = "문의 Seq")
    private Long qnaSeq;

    @ApiModelProperty(value = "문의 제목")
    private String qnaTitle;

    @ApiModelProperty(value = "문의 내용")
    private String qnaDesc;


}
