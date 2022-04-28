package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment,Long> {

    List<CommunityComment> findTop10ByCommunityAndCommunityCommentLayerIsNotOrderByCommunityCommentRegedAtDesc
            (Community community,int CommunityCommentLayer);



}
