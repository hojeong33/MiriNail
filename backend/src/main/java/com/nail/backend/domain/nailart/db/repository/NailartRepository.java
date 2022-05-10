package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface NailartRepository extends JpaRepository<Nailart, Long> {
    Page<Nailart> findByDesignerSeq(long designerSeq, Pageable pageable);
    Nailart findByNailartSeq(long nailartSeq);
    List<Nailart> findAllByDesignerSeq(long designerSeq);
    Long countByDesignerSeq(long designerDeq);
    @Transactional
    Nailart deleteByNailartSeq(long nailartSeq);

    // sac --------------------------------------------------
    @Query(value = "SELECT n FROM Nailart n WHERE CONCAT(n.nailartType ,' ',  n.nailartDetailColor) LIKE %:name%")
    Page<Nailart> searchByNailartName(@Param("name") String name,Pageable pageable);

}
