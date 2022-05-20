package com.nail.backend.domain.follow.service;


import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FollowService {

    Follow followRegister(Long followeeId, Long userSeq);
    Follow followRemove(Long followeeId, Long userSeq);

    List<User> getFollowerList(Long userSeq);
    Page<User> getFollowerList(Long userSeq, Pageable pageable);
    Page<DesignerInfo> getFolloweeList(Long userSeq, Pageable pageable);

//    List<FollowerListGetRes> getFollowerList(List<Follow> follow);
}

