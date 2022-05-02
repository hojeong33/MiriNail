package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Review findByReviewSeq(Long reviewSeq);

    // READ
    Page<Review> findAllByNailart_NailartSeq (Pageable pageable, Long nailartSeq);
    Page<Review> findAllByUser_UserSeq (Pageable pageable, Long userSeq);
    Page<Review> findAllByDesigner_UserSeq (Pageable pageable, Long userSeq);

}
