package com.nail.backend.domain.follow.service;


import com.nail.backend.domain.user.db.entity.User;

import java.util.List;

public interface FollowService {

//    Follow FollowRegister(Long followeeId, Long userId);
//    Follow FollowRemove(Long followeeId, Long userId);

    List<User> FollowerList(String userId);
    List<User> FolloweeList(String userId);

//    List<FollowerListGetRes> getFollowerList(List<Follow> follow);
}

