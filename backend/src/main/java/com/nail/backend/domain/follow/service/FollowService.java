package com.nail.backend.domain.follow.service;


import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FollowService {

    Follow followRegister(Long followeeId, String userId);
    Follow followRemove(Long followeeId, String userId);

    List<User> getFollowerList(Long userSeq);
    List<User> getFollowerList(Long userSeq, Pageable pageable);
    List<DesignerInfo> getFolloweeList(Long userSeq, Pageable pageable);

//    List<FollowerListGetRes> getFollowerList(List<Follow> follow);
}

