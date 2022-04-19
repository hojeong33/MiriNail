package com.nail.backend.domain.qna.db.repository;

import com.nail.backend.domain.qna.db.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna,Long> {
}
