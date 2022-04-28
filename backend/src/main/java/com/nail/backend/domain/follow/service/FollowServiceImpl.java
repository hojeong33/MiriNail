package com.nail.backend.domain.follow.service;

import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.repository.FollowRepositorySupport;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FollowService")
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Override
    public Follow followRegister(Long followeeId, String userId) {
        Follow follow = followRepositorySupport.followRegister(followeeId,userId);
        return follow;
    }

    @Override
    public Follow followRemove(Long followeeId, String userId) {
        Follow follow = followRepositorySupport.followRemove(followeeId,userId);
        return follow;
    }

    @Override
    public List<User> getFollowerList(Long userSeq) {
        List<User> list = followRepositorySupport.FollowerList(userSeq);
        return list;
    }

    @Override
    public List<User> getFolloweeList(Long userSeq) {
        List<User> list = followRepositorySupport.FolloweeList(userSeq);
        return list;
    }

}
