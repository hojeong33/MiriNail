package com.nail.backend.domain.qna.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(value = "QnA Answer", description = "문의 답변")
public class QnaAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qnaAnswerSeq;


    @JoinColumn(name = "qna_seq")
    @ApiModelProperty(value = "문의 Seq")
    private Long qnaSeq;

    @ApiModelProperty(value = "문의 답변 내용")
    private Long qnaAnswerDesc;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime qnaAnswerRegedAt;



}
