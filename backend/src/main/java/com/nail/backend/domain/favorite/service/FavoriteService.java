package com.nail.backend.domain.favorite.service;



import com.nail.backend.domain.favorite.db.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FavoriteService {

    //Create
    Favorite favoriteRegister(String userId, Long nailartSeq);

    //Read
    boolean getIsFavorited(String userId, Long nailartSeq);
    Long getFavoriteCount(Long productId);

    //Delete
    Favorite favoriteRemove(String userId, Long nailartSeq);

    Page<Favorite> getFavoriteListByUserSeq(Long userSeq, Pageable pageable);

}
