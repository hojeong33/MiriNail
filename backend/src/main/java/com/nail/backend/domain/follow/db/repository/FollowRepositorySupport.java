package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.entity.QFollow;
import com.nail.backend.domain.follow.response.FollowCountRes;
import com.nail.backend.domain.user.db.entity.QUser;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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

    public List<User> FollowerList(Long userSeq) {

        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userSeq.in(
                        jpaQueryFactory.select(qFollow.followFollower.userSeq)
                                .from(qFollow)
                                .where(qFollow.followFollowee.userSeq.eq(userSeq))
                ))
                .fetch();

        return userList;

    }

    public List<User> FolloweeList(Long userSeq) {

        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userSeq.in(
                        jpaQueryFactory.select(qFollow.followFollowee.userSeq)
                                .from(qFollow)
                                .where(qFollow.followFollower.userSeq.eq(userSeq))
                ))
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

    public List<FollowCountRes> getDesignerTop10ByFolloweeCnt(){
        List<FollowCountRes> result = new ArrayList<>();
        List<Tuple> list = jpaQueryFactory.select(qFollow.followFollowee, qFollow.count())
                .from(qFollow)
                .groupBy(qFollow.followFollowee)
                .orderBy(qFollow.count().desc())
                .limit(10)
                .fetch();
        list.forEach( num -> {
            FollowCountRes tmp = new FollowCountRes();
            User utmp = num.get(qFollow.followFollowee);
            System.out.println(utmp);
            tmp.setFollowFollowee(utmp.getUserSeq());
            tmp.setCount(num.get(qFollow.count()));
            result.add(tmp);
        });
        return result;
    }
}
