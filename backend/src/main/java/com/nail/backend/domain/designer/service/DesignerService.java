package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.response.DesignerListConditionGetRes;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DesignerService {
    List<DesignerListConditionGetRes> getDesignerListbyFollowCount();
    List<DesignerListConditionGetRes> getDesignerListbylatest();
    List<DesignerListConditionGetRes> getDesignerListbyRating();
    List<DesignerListConditionGetRes> getDesignerAllList(int page, int size);


}
