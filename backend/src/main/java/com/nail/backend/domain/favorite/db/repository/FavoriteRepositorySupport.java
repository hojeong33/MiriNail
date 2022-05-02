package com.nail.backend.domain.favorite.db.repository;

import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.nail.backend.domain.favorite.db.entity.QFavorite;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoriteRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    NailartRepository nailartRepository;

    QFavorite qFavorite = QFavorite.favorite;

    public Favorite favoriteRegister(Long userSeq, Long nailartSeq) {

        // 해당 유저가 해당 상품에 좋아요 했는지 확인
        Nailart nailart = nailartRepository.findByNailartSeq(nailartSeq);

        Favorite isExist = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.nailart.eq(nailart).and(qFavorite.userSeq.eq(userSeq)))
                .fetchFirst();

        if(isExist == null) {
            Favorite favorite = Favorite.builder()
                    .userSeq(userSeq)
                    .nailart(nailart)
                    .build();

            favoriteRepository.save(favorite);
            return favorite;
        }
        else return isExist;
    }

    public boolean getIsFavorited(Long userSeq, Long nailartSeq) {
        Nailart nailart = nailartRepository.findByNailartSeq(nailartSeq);

        Integer favorite = jpaQueryFactory.selectOne()
                .from(qFavorite)
                .where(qFavorite.userSeq.eq(userSeq)
                        .and(qFavorite.nailart.eq(nailart))).fetchFirst();

        if(favorite != null) return true;
        else return false;
    }

    public Long getFavoriteCount(Long nailartSeq) {
        Long favoriteCount = jpaQueryFactory.select(qFavorite.count())
                .from(qFavorite)
                .where(qFavorite.nailart.nailartSeq.eq(nailartSeq))
                .fetchFirst();

        return favoriteCount;
    }

    public Favorite favoriteRemove(Long userSeq, Long nailartSeq) {
        Nailart nailart = nailartRepository.findByNailartSeq(nailartSeq);

        Favorite favorite = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.userSeq.eq(userSeq)
                        .and(qFavorite.nailart.eq(nailart)))
                .fetchFirst();

        favoriteRepository.delete(favorite);

        return favorite;
    }

    public Page<Favorite> getFavoriteListByUserId(Long userSeq, Pageable pageable) {
        List<Favorite> favoriteList = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.userSeq.eq(userSeq))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(favoriteList, pageable, favoriteList.size());
    }
}
