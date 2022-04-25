package com.nail.backend.domain.nailart.db.repository;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NailartRepository extends JpaRepository<Nailart, Long> {
    Page<Nailart> findAll(Pageable pageable);
//    @Query(value = "SELECT designer_seq, token_id, nailart_name, nailart_desc, nailart_type, nailart_color, nailart_detail_color, nailart_weather, nailart_thumbnail_url, nailart_available, nailart_price, nailart_reged_at, nailart_rating FROM nailart where designer_seq order by nailart_seq desc limit =?1 offset =?2")
//    List<Nailart> findNailartList(int limit, int offset);
    Nailart findByNailartSeq(long nailartSeq);
}
