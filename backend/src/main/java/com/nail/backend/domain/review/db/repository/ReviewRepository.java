package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Review findByReviewSeq(Long reviewSeq);

}
