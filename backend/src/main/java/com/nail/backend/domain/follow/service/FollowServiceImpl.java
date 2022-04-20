package com.nail.backend.domain.follow.service;

import com.nail.backend.domain.follow.db.repository.FollowRepositorySupport;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FollowService")
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

//    @Override
//    public Follow FollowRegister(Long followeeId, Long userId) {
//        Follow follow = followRepositorySupport.FollowRegister(followeeId,userId);
//        return follow;
//    }
//
//    @Override
//    public Follow FollowRemove(Long followeeId, Long userId) {
//        Follow follow = followRepositorySupport.FollowRemove(followeeId,userId);
//        return follow;
//    }

    @Override
    public List<User> FollowerList(String userId) {
        List<User> list = followRepositorySupport.FollowerList(userId);
        return list;
    }

    @Override
    public List<User> FolloweeList(String userId) {
        List<User> list = followRepositorySupport.FolloweeList(userId);
        return list;
    }

}
