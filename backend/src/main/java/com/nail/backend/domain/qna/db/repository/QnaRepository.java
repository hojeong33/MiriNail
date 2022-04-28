package com.nail.backend.domain.qna.db.repository;

import com.nail.backend.domain.qna.db.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaRepository extends JpaRepository<Qna,Long> {

    Page<Qna> findAllByUserSeq(Pageable pageable, Long userSeq);
    Page<Qna> findAllByQnaNailartSeq(Pageable pageable, Long nailartSeq);
    Page<Qna> findAllByQnaDesignerSeq(Long designerSeq, Pageable pageable );

}
