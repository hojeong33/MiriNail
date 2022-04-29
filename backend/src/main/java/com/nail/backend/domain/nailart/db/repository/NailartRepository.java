package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NailartRepository extends JpaRepository<Nailart, Long> {
    Page<Nailart> findByDesignerSeq(long designerSeq, Pageable pageable);
    Nailart findByNailartSeq(long nailartSeq);
    List<Nailart> findAllByDesignerSeq(long designerSeq);
    Long countByDesignerSeq(long designerDeq);
    Nailart deleteByNailartSeq(long nailartSeq);

}
