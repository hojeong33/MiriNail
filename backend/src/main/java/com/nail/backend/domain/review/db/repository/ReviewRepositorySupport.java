package com.nail.backend.domain.review.db.repository;

import com.nail.backend.domain.review.db.entity.QReview;
import com.nail.backend.domain.review.request.ReviewUpdatePostReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class ReviewRepositorySupport {
    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QReview qReview = QReview.review;
    @Transactional
    public Long modifyReview(ReviewUpdatePostReq reviewUpdatePostReq){
        Long execute = jpaQueryFactory.update(qReview)
                .set(qReview.reviewTitle, reviewUpdatePostReq.getReviewTitle())
                .set(qReview.reviewDesc, reviewUpdatePostReq.getReviewDesc())
                .set(qReview.reviewRating, reviewUpdatePostReq.getReviewRating())
                .where(qReview.reviewSeq.eq(reviewUpdatePostReq.getReviewSeq()))
                .execute();
        return execute;
    }

    @Transactional
    public Long modifyReviewCnt(Long reviewSeq){
        Long execute = jpaQueryFactory.update(qReview)
                .set(qReview.reviewCnt, qReview.reviewCnt.add(1))
                .where(qReview.reviewSeq.eq(reviewSeq))
                .execute();
        return execute;
    }
    @Transactional
    public double getAvgRate(Long nailartSeq){
        double execute = jpaQueryFactory.select(qReview.reviewRating.avg())
                .from(qReview)
                .where(qReview.nailart.nailartSeq.eq(nailartSeq))
                .fetchOne();
        return execute;
    }
}
