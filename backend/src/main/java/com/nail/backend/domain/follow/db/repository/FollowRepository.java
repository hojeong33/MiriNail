package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.follow.db.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
}
