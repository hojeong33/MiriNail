package com.nail.backend.domain.desinger.db.repository;

import com.nail.backend.domain.desinger.db.entitiy.DesignerInfo;
import com.nail.backend.domain.desinger.db.entitiy.DesignerInfoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignerRepository extends JpaRepository<DesignerInfo, DesignerInfoId> {
    DesignerInfo findByDesignerSeq(long designerSeq);
}
