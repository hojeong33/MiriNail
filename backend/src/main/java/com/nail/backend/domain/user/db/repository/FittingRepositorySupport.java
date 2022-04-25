package com.nail.backend.domain.user.db.repository;

import com.nail.backend.domain.user.db.entity.FittingImg;
import com.nail.backend.domain.user.db.entity.QFittingImg;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public class FittingRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QFittingImg qFittingImg = QFittingImg.fittingImg;

    public Optional<FittingImg> findByUserSeq(Long userSeq) {
        FittingImg fittingImg = jpaQueryFactory.select(qFittingImg)
                .from(qFittingImg)
                .where(qFittingImg.user.userSeq.eq(userSeq))
                .fetchOne();

        if(null == fittingImg) return Optional.empty();
        return Optional.ofNullable(fittingImg);
    }
}
