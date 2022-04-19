package com.nail.backend.domain.qna.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Builder
@Getter
@ApiModel(value = "QnA", description = "문의 및 답변")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@ToString
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long qnaSeq;

    @ApiModelProperty(value = "유저 번호")
    Long userSeq;

    @ApiModelProperty(value = "QnA 제목")
    String qnaTitle;

    @ApiModelProperty(value = "QnA 내용")
    String qnaDesc;

    @ApiModelProperty(value = "QnA 사진 url")
    String qnaImgUrl;

    @ApiModelProperty(value = "QnA 디자이너Seq")
    Long qnaDesignerSeq;

    @ApiModelProperty(value = "QnA nailart Seq")
    Long qnaNailartSeq;

    @ApiModelProperty(value = "QnA 답변 여부")
    boolean qnaIsAnswered;

    //false :공개, true : 비공개
    @ApiModelProperty(value = "QnA 비공개 여부")
    boolean qnaIsPrivated;


    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime qnaRegedAt;

}
