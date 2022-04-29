package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.NailartImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NailartImgRepository extends JpaRepository<NailartImg, Long> {
    NailartImg findByNailartSeq(long nailartSeq);
    NailartImg deleteByNailartSeq(long nailartSeq);
}
