package com.nail.backend.domain.designer.response;

import com.nail.backend.domain.designer.db.entitiy.DesignerNewsImg;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignerNewsListGetRes {

    private long designerNewsSeq;

    private long designerSeq;

    private String designerNewsTitle;

    private String designerNewsDesc;

    private Timestamp designerNewsRegedAt;

    List<DesignerNewsImg> designerNewsImgUrl;
}
