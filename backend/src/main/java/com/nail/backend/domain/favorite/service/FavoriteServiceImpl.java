package com.nail.backend.domain.favorite.service;


import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.nail.backend.domain.favorite.db.repository.FavoriteRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("favoriteService")
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;

    // Create
    @Override
    public Favorite favoriteRegister(String userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRegister(userId,productId);
        return favorite;
    }

    // Read
    @Override
    public boolean getFavoriteUserUse(String userId, Long productId){
        return favoriteRepositorySupport.getFavoriteUserUse(userId,productId);
    }

    @Override
    public Long getFavoriteCount(Long productId) {
        return favoriteRepositorySupport.getFavoriteCount(productId);
    }

    // Delete
    @Override
    public Favorite favoriteRemove(String userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRemove(userId,productId);
        return favorite;
    }

    @Override
    public Page<Favorite> getFavoriteListByUserSeq(String userId, Pageable pageable) {
        Page<Favorite> favorites = favoriteRepositorySupport.getFavoriteListByUserId(userId, pageable);
        return favorites;
    }
}
