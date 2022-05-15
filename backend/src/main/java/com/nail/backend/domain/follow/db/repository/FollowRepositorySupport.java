package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.entitiy.QDesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.db.entity.QFollow;
import com.nail.backend.domain.follow.response.FollowCountRes;
import com.nail.backend.domain.user.db.entity.QUser;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    DesignerInfoRepository designerInfoRepository;

    QUser qUser = QUser.user;

    QFollow qFollow = QFollow.follow;

    QDesignerInfo qDesignerInfo = QDesignerInfo.designerInfo;

    public Page<User> FollowerList(Long designerSeq, Pageable pageable) {

        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userSeq.in(
                        jpaQueryFactory.select(qFollow.followFollower.userSeq)
                                .from(qFollow)
                                .where(qFollow.followFollowee.designerSeq.eq(designerSeq))
                ))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(userList, pageable, userList.size());

    }

    public Page<DesignerInfo> FolloweeList(Long userSeq, Pageable pageable) {

        List<DesignerInfo> designerInfoList = jpaQueryFactory.select(qDesignerInfo)
                .from(qDesignerInfo)
                .where(qDesignerInfo.designerSeq.in(
                        jpaQueryFactory.select(qFollow.followFollowee.designerSeq)
                                .from(qFollow)
                                .where(qFollow.followFollower.userSeq.eq(userSeq))
                ))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(designerInfoList, pageable, designerInfoList.size());
    }

    public Follow followRegister(Long followeeId, String userId) {

        // 토큰에 카카오 id 값이 들어있다는 전제하에 코딩함.

        // 해당 팔로우가 이미 있는지 확인.
        Follow isExist = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollower.userId.eq(userId)
                        .and(qFollow.followFollowee.designerSeq.eq(followeeId)))
                .fetchFirst();

        if(null == isExist) {
            DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(followeeId);
            User follower = userRepository.findByUserId(userId);
            Follow follow = Follow.builder()
                    .followFollowee(designerInfo)
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
                        .and(qFollow.followFollowee.designerSeq.eq(followeeId)))
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
            DesignerInfo utmp = num.get(qFollow.followFollowee);
            tmp.setFollowFollowee(utmp.getDesignerSeq());
            tmp.setCount(num.get(qFollow.count()));
            result.add(tmp);
        });
        return result;
    }

    public List<User> FollowerListAll(Long designerSeq) {
        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userSeq.in(
                        jpaQueryFactory.select(qFollow.followFollower.userSeq)
                                .from(qFollow)
                                .where(qFollow.followFollowee.designerSeq.eq(designerSeq))
                ))
                .fetch();

        return userList;
    }
}
