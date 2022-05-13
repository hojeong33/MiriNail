package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.response.CommunityCommentGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment,Long> {

    Page<CommunityComment> findAllByCommunity_CommunitySeqAndCommunityCommentLayerIsNot
            (Pageable pageable, Long communitySeq , int communityCommentLayer);

    Page<CommunityComment> findAllByCommunityGroupNumAndCommunityCommentLayer
            (Pageable pageable, Long communityCommentSeq , int communityCommentLayer);

    List<CommunityComment> findAllByCommunityGroupNumAndCommunityCommentLayer
            (Long communityCommentSeq , int communityCommentLayer);
}
