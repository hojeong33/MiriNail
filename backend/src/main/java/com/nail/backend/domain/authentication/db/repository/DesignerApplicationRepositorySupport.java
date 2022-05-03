package com.nail.backend.domain.authentication.db.repository;

import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.authentication.db.entity.QDesignerApplication;
import com.nail.backend.domain.authentication.request.UpdateDesignerApplicationPatchReq;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.entitiy.QDesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.user.db.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DesignerApplicationRepositorySupport {


    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    DesignerApplicationRepository designerApplicationRepository;

    @Autowired
    DesignerInfoRepository designerInfoRepository;

    QDesignerApplication qDesignerApplication = QDesignerApplication.designerApplication;

    QDesignerInfo qDesignerInfo = QDesignerInfo.designerInfo;

    public Page<DesignerApplication> findDesignerApplicationList(Pageable pageable) {
        List<DesignerApplication> designerApplications = jpaQueryFactory.select(qDesignerApplication)
                .from(qDesignerApplication)
                .where(qDesignerApplication.designerAuthStatus.eq(0))
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

    public boolean updateDesignerApplication(UpdateDesignerApplicationPatchReq updateDesignerApplicationPatchReq) {

        // 1. 해당 디자이너가 작성한 인증 신청 찾기
        DesignerApplication designerApplication = jpaQueryFactory.select(qDesignerApplication)
                .from(qDesignerApplication)
                .where(qDesignerApplication.designerSeq.eq(updateDesignerApplicationPatchReq.getDesignerSeq()))
                .fetchFirst();

        // 2. 해당하는 신청 처리
        // 2-1 거절 인 경우
        if (!updateDesignerApplicationPatchReq.isAccepted()) {
            designerApplication.setDesignerAuthStatus(2);
            designerApplicationRepository.save(designerApplication);
            return false;
        }

        // 3. 승인일 경우 DesignerInfo에 등록 후 신청항목 삭제

        DesignerInfo designerInfo = DesignerInfo.builder()
                .designerSeq(designerApplication.getDesignerSeq())
                .user(designerApplication.getUser())
                .designerCertificationUrl(designerApplication.getDesignerCertification())
                .designerTel(designerApplication.getDesignerTel())
                .designerShopName(designerApplication.getDesignerShopName())
                .designerAddress(designerApplication.getDesignerAddress())
                .designerRegedAt(LocalDateTime.now())
                .build();

        // 디자인너 정보에 등록
        designerInfoRepository.save(designerInfo);

        // 인증 신청 목록에서 상태 승인됨으로 처리
        designerApplication.setDesignerAuthStatus(1);
        designerApplicationRepository.save(designerApplication);

        User user = designerApplication.getUser();
        user.setUserRole("ROLE_DESIGNER");

        return true;
    }
}
