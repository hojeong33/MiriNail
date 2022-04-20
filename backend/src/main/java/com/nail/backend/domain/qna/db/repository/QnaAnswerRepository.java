package com.nail.backend.domain.qna.db.repository;

import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaAnswerRepository extends JpaRepository<QnaAnswer,Long> {
}
