package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.ReviewComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewCommentRepository extends JpaRepository<ReviewComment,Long> {
    Page<ReviewComment> findAllByReview_ReviewSeqAndReviewCommentLayerIsNot
            (Pageable pageable, Long reviewSeq , int reviewCommentLayer);

    Page<ReviewComment> findAllByReviewGroupNumAndReviewCommentLayer
            (Pageable pageable, Long reviewCommentSeq , int reviewCommentLayer);
}
