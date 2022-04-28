package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.entitiy.QDesignerInfo;
import com.nail.backend.domain.designer.response.DesignerListConditionGetRes;
import com.nail.backend.domain.follow.db.entity.QFollow;
import com.nail.backend.domain.follow.db.repository.FollowRepository;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.user.db.entity.QUser;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DesignerRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DesignerRepository designerRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    FollowRepository followRepository;

    QUser qUser = QUser.user;

    QDesignerInfo qDesignerInfo = QDesignerInfo.designerInfo;

    QFollow qFollow = QFollow.follow;

    public Long getFollowerCount(long followFollowee){
        Long follower = jpaQueryFactory.select(qFollow.count())
                .from(qFollow)
                .where(qFollow.followFollowee.userSeq.eq(followFollowee))
                .fetchOne();
        return follower;
    }

    public List<DesignerListConditionGetRes> DesignerLatestList(){
        List<DesignerListConditionGetRes> result = new ArrayList<>();
        List<Long> designerSeqList = jpaQueryFactory.select(qDesignerInfo.designerSeq)
                .from(qDesignerInfo)
                .orderBy(qDesignerInfo.designerRegedAt.desc())
                .limit(10)
                .fetch();
        designerSeqList.forEach( num -> {
            DesignerListConditionGetRes tmp = new DesignerListConditionGetRes();
            User user = userRepository.findByUserSeq(num);
            DesignerInfo designerInfo = designerRepository.findByDesignerSeq(num);
            tmp.setDesignerSeq(user.getUserSeq());
            tmp.setDesignerImgUrl(user.getUserProfileImg());
            tmp.setDesignerShopName(designerInfo.getDesignerShopName());
            tmp.setDesignerNickName(user.getUserNickname());
            tmp.setNailartCount(nailartRepository.countByDesignerSeq(num));
            tmp.setFollowerNum(getFollowerCount(num));

            result.add(tmp);
        });

        return result;
    }

    public List<DesignerListConditionGetRes> DesignerAllList(int page, int size){
        List<DesignerListConditionGetRes> result = new ArrayList<>();
        List<Long> designerSeqList = jpaQueryFactory.select(qDesignerInfo.designerSeq)
                .from(qDesignerInfo)
                .orderBy(qDesignerInfo.designerSeq.desc())
                .limit(size)
                .offset((page-1)*size)
                .fetch();
        designerSeqList.forEach( num -> {
            DesignerListConditionGetRes tmp = new DesignerListConditionGetRes();
            User user = userRepository.findByUserSeq(num);
            DesignerInfo designerInfo = designerRepository.findByDesignerSeq(num);
            tmp.setDesignerSeq(user.getUserSeq());
            tmp.setDesignerImgUrl(user.getUserProfileImg());
            tmp.setDesignerShopName(designerInfo.getDesignerShopName());
            tmp.setDesignerNickName(user.getUserNickname());
            tmp.setNailartCount(nailartRepository.countByDesignerSeq(num));
            tmp.setFollowerNum(getFollowerCount(num));

            result.add(tmp);
        });

        return result;
    }
}
