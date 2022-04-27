package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerNewsImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignerNewsImgRepository extends JpaRepository<DesignerNewsImg, Long> {
    List<DesignerNewsImg> findAllByDesignerNewsSeq(long desingerNewsSeq);
}
