package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.QDesignerNewsImg;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class DesignerNewsImgRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    DesignerRepository designerRepository;

    QDesignerNewsImg qDesignerNewsImg = QDesignerNewsImg.designerNewsImg;

    @Transactional
    public Long DesignerNewImgDelete(long designerNewsSeq){
        long execute = jpaQueryFactory.delete(qDesignerNewsImg)
                .where(qDesignerNewsImg.designerNewsSeq.eq(designerNewsSeq))
                .execute();
        return execute;
    }

}
