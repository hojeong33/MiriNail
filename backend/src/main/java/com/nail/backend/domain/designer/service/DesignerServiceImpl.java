package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerRepository;
import com.nail.backend.domain.designer.db.repository.DesignerRepositorySupport;
import com.nail.backend.domain.designer.response.DesignerListConditionGetRes;
import com.nail.backend.domain.follow.db.repository.FollowRepositorySupport;
import com.nail.backend.domain.follow.response.FollowCountRes;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Component
public class DesignerServiceImpl implements DesignerService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Autowired
    DesignerRepositorySupport designerRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    DesignerRepository designerRepository;

    @Override
    public List<DesignerListConditionGetRes> getDesignerListbyFollowCount() {
        List<DesignerListConditionGetRes> result = new ArrayList<>();
        List<FollowCountRes> follow = followRepositorySupport.getDesignerTop10ByFolloweeCnt();
        int count = 0;
        follow.forEach(num -> {
            DesignerListConditionGetRes tmp = new DesignerListConditionGetRes();
            tmp.setDesignerSeq(num.getFollowFollowee());
            tmp.setFollowerNum(num.getCount());
            User user = userRepository.findByUserSeq(num.getFollowFollowee());
            DesignerInfo designerInfo = designerRepository.findByDesignerSeq(user.getUserSeq());
            tmp.setDesignerShopName(designerInfo.getDesignerShopName());
            tmp.setDesignerImgUrl(user.getUserProfileImg());
            tmp.setDesignerNickName(user.getUserNickname());
            List<Nailart> nailart = nailartRepository.findAllByDesignerSeq(user.getUserSeq());
            tmp.setNailartCount(nailart.size());

            result.add(tmp);
        });
        return result;
    }

    @Override
    public List<DesignerListConditionGetRes> getDesignerListbylatest() {
        return designerRepositorySupport.DesignerLatestList();
    }

    @Override
    public List<DesignerListConditionGetRes> getDesignerAllList(int page, int size) {
        return designerRepositorySupport.DesignerAllList(page, size);
    }
}
