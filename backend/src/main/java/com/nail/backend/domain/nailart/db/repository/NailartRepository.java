package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NailartRepository extends JpaRepository<Nailart, Long> {
    Page<Nailart> findAll(Pageable pageable);
    Nailart findByNailartSeq(long nailartSeq);
    List<Nailart> findAllByDesignerSeq(long designerSeq);
}
