package com.nail.backend.domain.favorite.db.repository;

import com.nail.backend.domain.favorite.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Long countByNailartSeq(Long nailartSeq);
}
