package com.nail.backend.domain.nailart.db.entity;

import com.nail.backend.domain.desinger.db.entitiy.DesignerInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="nailart")
@ApiModel(value = "NailArt", description = "NailArt 작품")
public class Nailart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "NailArt 작품 번호")
    private long nailartSeq;

//    @ManyToOne
//    @JoinColumn(name = "designer_seq", updatable = false, insertable = false)
//    private DesignerInfo designerInfo;

    @Column
    private long designerSeq;

    @Column(name = "token_id")
    private long tokenId;

    @Column(name = "nailart_name")
    private String nailartName;

    @Column(name = "nailart_desc")
    private String nailartDesc;

    @Column(name = "nailart_type")
    private String nailartType;

    @Column(name = "nailart_color")
    private String nailartColor;

    @Column(name = "nailart_detail_color")
    private String nailartDetailColor;

    @Column(name = "nailart_weather")
    private String nailartWeather;

    @Column(name = "nailart_thumbnail_url")
    private String nailartThumbnailUrl;

    @Column(name = "nailart_available")
    private boolean nailartAvailable;

    @Column(name = "nailart_price")
    private int nailartPrice;

    @Column(name = "nailart_reged_at")
    private Timestamp nailartRegedAt;

    @Column(name = "nailart_rating")
    private float nailartRating;




}
