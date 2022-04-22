package com.nail.backend.domain.favorite.db.repository;

import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class FavoriteRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;


    public Favorite favoriteRegister(String userId, Long productId) {
        return null;
    }

    public boolean getFavoriteUserUse(String userId, Long productId) {
        return false;
    }

    public Long getFavoriteCount(Long productId) {
        return null;
    }

    public Favorite favoriteRemove(String userId, Long productId) {
        return null;
    }

    public Page<Favorite> getFavoriteListByUserId(String userId, Pageable pageable) {
        return null;
    }
}
