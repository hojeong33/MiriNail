package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.NailartImg;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface NailartImgRepository extends JpaRepository<NailartImg, Long> {
    @Transactional
    NailartImg findByNailartSeq(long nailartSeq);
    @Transactional
    NailartImg deleteAllByNailartSeq(long nailartSeq);
}
