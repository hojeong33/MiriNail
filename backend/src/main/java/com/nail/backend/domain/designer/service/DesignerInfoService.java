package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.response.DesignerInfoGetRes;

public interface DesignerInfoService {
    DesignerInfoGetRes designerInfo(long designerSeq);
}
