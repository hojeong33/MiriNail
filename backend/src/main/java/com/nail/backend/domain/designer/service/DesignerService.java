package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.response.DesignerListConditionGetRes;

import java.util.List;

public interface DesignerService {
    List<DesignerListConditionGetRes> getDesignerListbyFollowCount();
    List<DesignerListConditionGetRes> getDesignerListbylatest();
    List<DesignerListConditionGetRes> getDesignerAllList(int page, int size);

}
