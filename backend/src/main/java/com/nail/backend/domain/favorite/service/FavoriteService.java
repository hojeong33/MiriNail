package com.nail.backend.domain.favorite.service;



import com.nail.backend.domain.favorite.db.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FavoriteService {

    //Create
    Favorite favoriteRegister(String userSeq, Long productId);

    //Read
    boolean getFavoriteUserUse(String userSeq, Long productId);
    Long getFavoriteCount(Long productId);

    //Delete
    Favorite favoriteRemove(String userSeq, Long productId);

    Page<Favorite> getFavoriteListByUserSeq(String userSeq, Pageable pageable);

    //user쪽에서 구현됨
//    List<Product> getFavoriteList(Long userId);
}
