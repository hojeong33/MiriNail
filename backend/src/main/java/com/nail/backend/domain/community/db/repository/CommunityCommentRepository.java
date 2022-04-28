package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment,Long> {
}
