package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.response.DesignerListCountFollowerGetRes;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.repository.FollowRepository;
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
    UserRepository userRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Override
    public List<DesignerListCountFollowerGetRes> getDesignerListbyFollowCount() {
        List<DesignerListCountFollowerGetRes> result = new ArrayList<>();
        List<FollowCountRes> follow = followRepositorySupport.getDesignerTop10ByFolloweeCnt();
        int count = 0;
        follow.forEach(num ->{
            DesignerListCountFollowerGetRes tmp = new DesignerListCountFollowerGetRes();
            tmp.setDesignerSeq(num.getFollowFollowee());
            tmp.setFollowerNum(num.getCount());
            User user = userRepository.findByUserSeq(num.getFollowFollowee());
            tmp.setDesignerImgUrl(user.getUserProfileImg());
            tmp.setDesignerNickName(user.getUserNickname());
            List<Nailart> nailart = nailartRepository.findAllByDesignerSeq(user.getUserSeq());
            tmp.setNailartCount(nailart.size());

            result.add(tmp);
        });
        return result;
    }
}
