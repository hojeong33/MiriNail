package com.nail.backend.domain.qna.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel(value = "QnaGetRes", description = "qna 반환하는 정보")
public class QnaGetRes {


    @ApiModelProperty(value = "qna 번호")
    private Long qnaSeq;

    @ApiModelProperty(value = "유저 번호")
    private Long userSeq;

    @ApiModelProperty(value = "유저 닉네임")
    private String userNickname;

    @ApiModelProperty(value = "QnA 제목")
    private String qnaTitle;

    @ApiModelProperty(value = "QnA 내용")
    private String qnaDesc;

    @ApiModelProperty(value = "QnA 사진 url")
    private String qnaImgUrl;

    @ApiModelProperty(value = "QnA 디자이너Seq")
    private Long qnaDesignerSeq;

    @ApiModelProperty(value = "QnA nailart Seq")
    private Long qnaNailartSeq;

    @ApiModelProperty(value = "QnA 답변 여부")
    private boolean qnaIsAnswered;

    //false :공개, true : 비공개
    @ApiModelProperty(value = "QnA 비공개 여부")
    private boolean qnaIsPrivated;

    @Column(name = "qna_type", columnDefinition = "TINYINT")
    @ApiModelProperty(value = "문의 종류")
    private int qnaType;

    @ApiModelProperty(value = "QnA 작성일")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime qnaRegedAt;

    @ApiModelProperty(value = "QnA 답변")
    private QnaAnswer qnaAnswer;


}
