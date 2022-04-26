package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.request.BookPostReq;

public interface BookService {
    boolean bookRegister(BookPostReq bookPostReq);
}
