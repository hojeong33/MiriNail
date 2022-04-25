package com.nail.backend.domain.favorite.db.repository;

import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.nail.backend.domain.favorite.db.entity.QFavorite;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class FavoriteRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FavoriteRepository favoriteRepository;

    QFavorite qFavorite = QFavorite.favorite;

    public Favorite favoriteRegister(Long userSeq, Long nailartSeq) {

        // 해당 유저가 해당 상품에 좋아요 했는지 확인

        Favorite isExist = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.nailartSeq.eq(nailartSeq).and(qFavorite.userSeq.eq(userSeq)))
                .fetchFirst();

        if(isExist == null) {
            Favorite favorite = Favorite.builder()
                    .userSeq(userSeq)
                    .nailartSeq(nailartSeq)
                    .build();

            favoriteRepository.save(favorite);
            return favorite;
        }
        else return isExist;
    }

    public boolean getIsFavorited(Long userSeq, Long nailartSeq) {
        Integer favorite = jpaQueryFactory.selectOne()
                .from(qFavorite)
                .where(qFavorite.userSeq.eq(userSeq)
                        .and(qFavorite.nailartSeq.eq(nailartSeq))).fetchFirst();

        if(favorite != null) return true;
        else return false;
    }

    public Long getFavoriteCount(Long nailartSeq) {
        return favoriteRepository.countByNailartSeq(nailartSeq);
    }

    public Favorite favoriteRemove(Long userSeq, Long nailartSeq) {
        Favorite favorite = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.userSeq.eq(userSeq)
                        .and(qFavorite.nailartSeq.eq(nailartSeq)))
                .fetchFirst();

        favoriteRepository.delete(favorite);

        return favorite;
    }

    public Page<Favorite> getFavoriteListByUserId(Long userSeq, Pageable pageable) {

        return null;
    }
}
