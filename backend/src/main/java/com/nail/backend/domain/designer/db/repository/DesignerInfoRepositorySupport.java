package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.entitiy.QDesignerInfo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class DesignerInfoRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QDesignerInfo qDesignerInfo = QDesignerInfo.designerInfo;

    @Transactional
    public long DesignerInfoIntroduceUpdate(DesignerInfo designerInfo, String designerInfoImgUrl){
        long excute = jpaQueryFactory.update(qDesignerInfo)
                .set(qDesignerInfo.designerInfoImgUrl, designerInfoImgUrl)
                .set(qDesignerInfo.designerInfoDesc, designerInfo.getDesignerInfoDesc())
                .set(qDesignerInfo.designerShopName, designerInfo.getDesignerShopName())
                .set(qDesignerInfo.designerAddress, designerInfo.getDesignerAddress())
                .set(qDesignerInfo.designerShopOpen, designerInfo.getDesignerShopOpen())
                .set(qDesignerInfo.designerShopClose, designerInfo.getDesignerShopClose())
                .set(qDesignerInfo.designerTel, designerInfo.getDesignerTel())
                .where(qDesignerInfo.designerSeq.eq(designerInfo.getDesignerSeq()))
                .execute();
        return excute;
    }


}
