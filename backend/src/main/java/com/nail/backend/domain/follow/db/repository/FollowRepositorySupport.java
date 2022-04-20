package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.follow.db.entity.QFollow;
import com.nail.backend.domain.user.db.entity.QUser;
import com.nail.backend.domain.user.db.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QUser qUser = QUser.user;

    QFollow qFollow = QFollow.follow;

    public List<User> FollowerList(String userId) {
        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qFollow)
                .where(qFollow.followFollowee.userId.eq(userId))
                .fetch();

        return userList;
    }

    public List<User> FolloweeList(String userId) {
        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qFollow)
                .where(qFollow.followFollower.userId.eq(userId))
                .fetch();

        return userList;
    }
}
