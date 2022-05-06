package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.QCommunityComment;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommunityCommentRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QCommunityComment qCommunityComment = QCommunityComment.communityComment;


    // 댓글 작성시 groupNum 초기화
    public Long setCommentGroup(Long communityCommentSeq){
        Long execute = jpaQueryFactory.update(qCommunityComment)
                .set(qCommunityComment.communityGroupNum, communityCommentSeq)
                .where(qCommunityComment.communityCommentSeq.eq(communityCommentSeq))
                .execute();

        return execute;
    }

    public Long modifyCommentLayer(Long communityCommentSeq){
        Long execute = jpaQueryFactory.update(qCommunityComment)
                .set(qCommunityComment.communityCommentLayer, 2)
                .where(qCommunityComment.communityCommentSeq.eq(communityCommentSeq))
                .execute();
        return execute;
    }

    // 댓글 수정
    public Long updateCommunityCommentByCommentSeq(CommunityCommentModifyPutReq communityCommentModifyPutReq){
        Long execute = jpaQueryFactory.update(qCommunityComment)
                .set(qCommunityComment.communityCommentDesc, communityCommentModifyPutReq.getCommunityCommentDesc())
                .where(qCommunityComment.communityCommentSeq.eq(communityCommentModifyPutReq.getCommunityCommentSeq()))
                .execute();
        return execute;
    }

    // 댓글 삭제
    // 삭제된 댓글입니다로 업데이트
    public Long deleteCommunityComment(Long communityCommentSeq){
        Long execute = jpaQueryFactory.update(qCommunityComment)
                .set(qCommunityComment.communityCommentDesc,"삭제된 댓글입니다.")
                .set(qCommunityComment.communityCommentIsDelete,true)
                .where(qCommunityComment.communityCommentSeq.eq(communityCommentSeq))
                .execute();
        return execute;
    }
}
