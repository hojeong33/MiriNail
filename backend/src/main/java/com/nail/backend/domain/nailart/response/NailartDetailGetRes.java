package com.nail.backend.domain.nailart.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NailartDetailGetRes {

    private long nailartSeq;

    private long designerSeq;

    private long tokenId;

    private String designerImgUrl;

    private String designerNickname;

    private String nailartName;

    private String nailartDesc;

    private String nailartType;

    private String nailartColor;

    private String nailartDetailColor;

    private String nailartWeather;

    private String nailartThumbnailUrl;

    private String designerShopName;

    private boolean nailartAvailable;

    private int nailartPrice;

    private Timestamp nailartRegedAt;

    private float nailartRating;

    private String nailartImgUrl;

    private String nailartNft;
}
