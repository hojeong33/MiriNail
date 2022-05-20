package com.nail.backend.domain.follow.db.repository;

import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.response.FollowCountRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
}
