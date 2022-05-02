package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.ReviewImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewImgRepository extends JpaRepository<ReviewImg,Long> {
}
