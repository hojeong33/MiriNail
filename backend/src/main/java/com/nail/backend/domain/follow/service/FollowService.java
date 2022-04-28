package com.nail.backend.domain.follow.service;


import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.user.db.entity.User;

import java.util.List;

public interface FollowService {

    Follow followRegister(Long followeeId, String userId);
    Follow followRemove(Long followeeId, String userId);

    List<User> getFollowerList(Long userSeq);
    List<User> getFolloweeList(Long userSeq);

//    List<FollowerListGetRes> getFollowerList(List<Follow> follow);
}

