package com.nail.backend.domain.designer.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignerRankGetRes {
    // 디자이너 이름, 디자이너 사진, 매장, 팔로워 수, 작품 수
    String designerNickname;

    String designerProfileImg;

    String designerShopName;

    int followerCount;

    int nailartCount;

}
