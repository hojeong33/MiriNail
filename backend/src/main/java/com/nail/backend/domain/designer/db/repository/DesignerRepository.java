package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DesignerRepository extends JpaRepository<DesignerInfo, Long> {
    DesignerInfo findByDesignerSeq(long designerSeq);

    Page<DesignerInfo> findByDesignerShopNameContainingIgnoreCase(Pageable pageable, String designerShopName);
}
