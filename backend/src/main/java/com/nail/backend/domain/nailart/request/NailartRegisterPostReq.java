package com.nail.backend.domain.nailart.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NailartRegisterPostReq {
     //유저 번호,네일 타입, 네일 계절, 네일 가격, 세부 색상, 색상, 소개글, 이미지 2개( 썸네일, ar )
    long designerSeq;

    String nailartName;

    String nailartDesc;

    String nailartType;

    String nailartColor;

    String nailartDetailColor;

    String nailartWeather;

    int nailartPrice;


}
//@Data
//public class NailartRegisterPostReq {
//    String name;
//    String gender;
//}
