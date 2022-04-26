package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.repository.BookRepositorySupport;
import com.nail.backend.domain.book.request.BookPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepositorySupport bookRepositorySupport;

    @Override
    public boolean bookRegister(BookPostReq bookPostReq) {
        boolean isBooked = bookRepositorySupport.bookRegister(bookPostReq);
        return isBooked;
    }
}
