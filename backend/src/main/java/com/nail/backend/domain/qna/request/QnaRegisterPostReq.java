package com.nail.backend.domain.qna.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("QnaRegisterPostReq")
@ToString
public class QnaRegisterPostReq {


    @ApiModelProperty(value = "문의 제목")
    private String qnaTitle;

    @ApiModelProperty(value = "문의 내용")
    private String qnaDesc;

    @ApiModelProperty(value = "문의 종류")
    private int qnaType;

    @ApiModelProperty(value = "문의 남길 디자이너 번호")
    private Long qnaDesignerSeq;

    @ApiModelProperty(value = "문의 남길 작품 번호")
    private Long qnaNailartSeq;

    @ApiModelProperty(value = "QnA 비공개 여부")
    boolean qnaIsPrivated;

}
