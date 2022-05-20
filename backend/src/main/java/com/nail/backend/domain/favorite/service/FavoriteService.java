package com.nail.backend.domain.favorite.service;



import com.nail.backend.domain.favorite.db.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FavoriteService {

    //Create
    Favorite favoriteRegister(String userId, Long nailartSeq);

    //Read
    boolean getIsFavorited(Long userSeq, Long nailartSeq);
    Long getFavoriteCount(Long productId);

    //Delete
    Favorite favoriteRemove(Long userSeq, Long nailartSeq);

    Page<Favorite> getFavoriteListByUserSeq(Long userSeq, Pageable pageable);

}
