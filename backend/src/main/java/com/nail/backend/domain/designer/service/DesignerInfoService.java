package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.response.DesignerInfoGetRes;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface DesignerInfoService {
    DesignerInfoGetRes designerInfo(long designerSeq);
    boolean designerProfileImgUrlupdate(long designerSeq, MultipartFile file);
    boolean designerIntroduceRegister (DesignerInfo designerInfo, MultipartFile file);

}
