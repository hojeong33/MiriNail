package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.request.BookPostReq;

public interface BookService {
    Book bookRegister(BookPostReq bookPostReq);
    BookCheck bookCheck(Long designerSeq, String bookDate);
}
