package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.request.BookPostReq;

import java.util.List;

public interface BookService {
    Book bookRegister(BookPostReq bookPostReq);
    BookCheck bookCheck(Long designerSeq, String bookDate);
    List<Book> getBookLitByUserSeq(Long userSeq);
    List<Book> getBookLitByDesignerSeq(Long designerSeq);
}
