package com.nail.backend.domain.follow.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.repository.FollowRepositorySupport;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FollowService")
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Override
    public Follow followRegister(Long followeeId, Long userSeq) {
        Follow follow = followRepositorySupport.followRegister(followeeId,userSeq);
        return follow;
    }

    @Override
    public Follow followRemove(Long followeeId, Long userSeq) {
        Follow follow = followRepositorySupport.followRemove(followeeId,userSeq);
        return follow;
    }

    @Override
    public List<User> getFollowerList(Long userSeq) {
        List<User> list = followRepositorySupport.FollowerListAll(userSeq);
        return list;
    }

    @Override
    public Page<User> getFollowerList(Long userSeq, Pageable pageable) {
        Page<User> list = followRepositorySupport.FollowerList(userSeq, pageable);
        return list;
    }

    @Override
    public Page<DesignerInfo> getFolloweeList(Long userSeq, Pageable pageable) {
        Page<DesignerInfo> list = followRepositorySupport.FolloweeList(userSeq, pageable);
        return list;
    }

}
