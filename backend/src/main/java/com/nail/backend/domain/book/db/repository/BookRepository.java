package com.nail.backend.domain.book.db.repository;

import com.nail.backend.domain.book.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
}
