package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community,Long> {
}
