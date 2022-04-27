package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.response.DesignerListCountFollowerGetRes;

import java.util.List;

public interface DesignerService {
    List<DesignerListCountFollowerGetRes> getDesignerListbyFollowCount();
}
