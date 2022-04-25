package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignerRepository extends JpaRepository<DesignerInfo, DesignerInfoId> {
    DesignerInfo findByDesignerSeq(long designerSeq);
}
