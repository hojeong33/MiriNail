package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.repository.DesignerRepository;
import com.nail.backend.domain.designer.response.DesignerInfoGetRes;
import com.nail.backend.domain.follow.service.FollowService;
import com.nail.backend.domain.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DesignerInfoServiceImpl implements DesignerInfoService{

    @Autowired
    DesignerRepository designerRepository;

    @Autowired
    FollowService followService;

    @Autowired
    UserRepository userRepository;


    @Override
    public DesignerInfoGetRes designerInfo(long designerSeq) {

        DesignerInfoGetRes designerInfoGetRes = new DesignerInfoGetRes();
        designerInfoGetRes.setDesignerInfo(designerRepository.findByDesignerSeq(designerSeq));
//        designerInfoGetRes.setFollower(followService.getFollowerList(userRepository.findByUserSeq(designerSeq).getUserId()));
        return designerInfoGetRes;
    }
}
