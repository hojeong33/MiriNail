package com.nail.backend.domain.book.db.repository;

import com.nail.backend.domain.book.db.entity.BookCheck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCheckRepository extends JpaRepository<BookCheck, Long> {
}
