package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.QReviewComment;
import com.nail.backend.domain.review.request.ReviewCommentModifyPutReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReviewCommentRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QReviewComment qReviewComment = QReviewComment.reviewComment;


    // 댓글 수정
    public Long updateReviewCommentByCommentSeq(ReviewCommentModifyPutReq reviewCommentModifyPutReq){
        Long execute = jpaQueryFactory.update(qReviewComment)
                .set(qReviewComment.reviewCommentDesc, reviewCommentModifyPutReq.getReviewCommentDesc())
                .where(qReviewComment.reviewCommentSeq.eq(reviewCommentModifyPutReq.getReviewCommentSeq()))
                .execute();
        return execute;
    }

    // 댓글 삭제
    // 삭제된 댓글입니다로 업데이트
    public Long deleteReviewComment(Long reviewCommentSeq){
        Long execute = jpaQueryFactory.update(qReviewComment)
                .set(qReviewComment.reviewCommentDesc,"삭제된 댓글입니다.")
                .where(qReviewComment.reviewCommentSeq.eq(reviewCommentSeq))
                .execute();
        return execute;
    }
}
