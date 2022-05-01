package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.response.DesignerInfoGetRes;
import org.springframework.web.multipart.MultipartFile;

public interface DesignerInfoService {
    DesignerInfoGetRes designerInfo(long designerSeq);
    boolean designerInfoImgUrlupdate(long designerSeq, MultipartFile file);
}
