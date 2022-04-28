package com.nail.backend.domain.designer.db.entitiy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "designer_news_img")
public class DesignerNewsImg implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long designerNewsImgSeq;

    long designerNewsSeq;

    String designerNewsImgUrl;
}
