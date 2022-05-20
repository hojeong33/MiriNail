package com.nail.backend.domain.favorite.service;


import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.nail.backend.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("favoriteService")
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;

    @Autowired
    UserRepository userRepository;
    // Create
    @Override
    public Favorite favoriteRegister(String userId, Long nailartSeq) {
        User user = userRepository.findByUserId(userId);
        Favorite favorite = favoriteRepositorySupport.favoriteRegister(user.getUserSeq(),nailartSeq);
        return favorite;
    }

    // Read
    @Override
    public boolean getIsFavorited(Long userSeq, Long nailartSeq){
        return favoriteRepositorySupport.getIsFavorited(userSeq,nailartSeq);
    }

    @Override
    public Long getFavoriteCount(Long nailartSeq) {
        return favoriteRepositorySupport.getFavoriteCount(nailartSeq);
    }

    // Delete
    @Override
    public Favorite favoriteRemove(String userId, Long productId) {
        User user = userRepository.findByUserId(userId);
        Favorite favorite = favoriteRepositorySupport.favoriteRemove(user.getUserSeq(),productId);
        return favorite;
    }

    @Override
    public Page<Favorite> getFavoriteListByUserSeq(Long userSeq, Pageable pageable) {
        Page<Favorite> favorites = favoriteRepositorySupport.getFavoriteListByUserId(userSeq, pageable);
        return favorites;
    }
}
