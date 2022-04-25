package com.nail.backend.domain.authentication.db.repository;

import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.authentication.db.entity.QDesignerApplication;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DesignerApplicationRepositorySupport {


    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    DesignerApplicationRepository designerApplicationRepository;

    QDesignerApplication qDesignerApplication = QDesignerApplication.designerApplication;

    public Page<DesignerApplication> findDesignerApplicationList(Pageable pageable) {
        List<DesignerApplication> designerApplications = jpaQueryFactory.select(qDesignerApplication)
                .from(qDesignerApplication)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(designerApplications.isEmpty()) return Page.empty();

        return new PageImpl<DesignerApplication>(designerApplications,pageable,designerApplications.size());
    }

    public boolean deleteByDesignerSeq(Long designerSeq) {

        DesignerApplication designerApplication = jpaQueryFactory.select(qDesignerApplication)
                .from(qDesignerApplication)
                .where(qDesignerApplication.designerSeq.eq(designerSeq))
                .fetchFirst();

        if(designerApplication != null) {
            designerApplicationRepository.delete(designerApplication);
            return true;
        }
        return false;
    }
}
