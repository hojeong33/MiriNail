package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    Page<Review> findAllByUser(Pageable pageable, User user);

}
