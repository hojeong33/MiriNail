package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.entity.QFollow;
import com.nail.backend.domain.user.db.entity.QUser;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FollowRepository followRepository;

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

    public Follow followRegister(Long followeeId, String userId) {
        User followee = userRepository.findByUserSeq(followeeId);
        User follower = userRepository.findByUserId(userId);
        // 토큰에 카카오 id 값이 들어있다는 전제하에 코딩함.

        // 해당 팔로우가 이미 있는지 확인.
        Follow isExist = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollower.eq(follower)
                        .and(qFollow.followFollowee.eq(followee)))
                .fetchFirst();

        if(null == isExist) {
            Follow follow = Follow.builder()
                    .followFollowee(followee)
                    .followFollower(follower)
                    .build();

            followRepository.save(follow);

            return follow;
        }
        return isExist;
    }

    public Follow followRemove(Long followeeId, String userId) {

        Follow follow = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollower.userId.eq(userId)
                        .and(qFollow.followFollowee.userSeq.eq(followeeId)))
                .fetchOne();

        followRepository.delete(follow);

        return follow;
    }
}
