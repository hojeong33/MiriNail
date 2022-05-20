package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.follow.request.BookPostReq;
import com.nail.backend.domain.book.response.BookListByUserSeqGetRes;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookService {
    Book bookRegister(BookPostReq bookPostReq);
    BookCheck bookCheck(Long designerSeq, String bookDate);
    BookListByUserSeqGetRes getBookLitByUserSeq(Long userSeq);
    boolean deleteBookByBookSeq(Long bookSeq);

    List<Book> getBookLitByDesignerSeqAndBookDate(Long designerSeq, String bookDate);
    Set<LocalDate> getBookListByDesignerSeq(Long designerSeq);
}
