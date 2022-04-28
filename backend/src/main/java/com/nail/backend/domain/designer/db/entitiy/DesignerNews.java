package com.nail.backend.domain.designer.db.entitiy;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Table(name = "designer_news")
@ApiModel(value = "DesignerNews", description = "디자이너 새 소식")
public class DesignerNews implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "designer_news_seq")
    @ApiModelProperty(value = "새 소식 구분 번호")
    private long designerNewsSeq;
    // 유저 번호를 외래 키로 가져 와야한다.( 지금 좀 헷갈린다. 컬럼이랑 조인 컬럼 이름이 같아도 되나? 인식을 우째 하지?)
    //@Id
    @Column(name = "designer_seq")
    @ApiModelProperty(value = "디자이너 번호")
    private long designerSeq;

    //    @ManyToOne
    //    @JoinColumn(name = "designer_seq")

    @Column(name = "designer_news_title")
    @ApiModelProperty(value = "새 소식 제목", required = true)
    private String designerNewsTitle;

    @Column(name = "designer_news_desc")
    @ApiModelProperty(value = "새 소식 내용", required = true)
    private String designerNewsDesc;

    @Column(name = "designer_newsImg_url")
    @ApiModelProperty(value = "새 소식 이미지")
    private String designerNewsImgUrl;
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @Column(name = "designer_news_reged_at")
    private Timestamp designerNewsRegedAt;


}
