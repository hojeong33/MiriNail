package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignerNewsRepository extends JpaRepository<DesignerNews, Long> {
    // 디자이너 번호로 해당 디자이너의 새소식을 불러온다.
    Page<DesignerNews> findAllByDesignerSeq(long designerSeq, Pageable pageable);
}
