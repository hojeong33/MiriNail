package com.nail.backend.domain.user.db.repository;

import com.nail.backend.domain.user.db.entity.FittingImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FittingRepository extends JpaRepository<FittingImg, Long> {
}
