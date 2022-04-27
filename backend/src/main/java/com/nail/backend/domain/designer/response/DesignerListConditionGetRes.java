package com.nail.backend.domain.designer.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignerListConditionGetRes {
    private long designerSeq;
    private String designerNickName;
    private String designerImgUrl;
    private String designerShopName;
    private long followerNum;
    private long nailartCount;
}
