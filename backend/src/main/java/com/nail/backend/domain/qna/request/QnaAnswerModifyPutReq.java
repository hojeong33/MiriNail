package com.nail.backend.domain.qna.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("QnaAnswerModifyPutReq")
public class QnaAnswerModifyPutReq {
    @ApiModelProperty(value = "문의 답변 번호")
    Long qnaAnswerSeq;

    @ApiModelProperty(value = "문의 답변내용")
    Long qnaAnswerDesc;
}
