package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.db.repository.BookCheckRepositorySupport;
import com.nail.backend.domain.book.db.repository.BookRepositorySupport;
import com.nail.backend.domain.book.request.BookPostReq;
import com.nail.backend.domain.book.response.BookListByUserSeqGetRes;
import com.querydsl.core.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepositorySupport bookRepositorySupport;

    @Autowired
    BookCheckRepositorySupport bookCheckRepositorySupport;

    @Override
    public Book bookRegister(BookPostReq bookPostReq) {
        Book book = bookRepositorySupport.bookRegister(bookPostReq);
        return book;
    }

    @Override
    public BookCheck bookCheck(Long designerSeq, String bookDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(bookDate, formatter);

        BookCheck bookCheck =  bookCheckRepositorySupport.findByDesignerSeqAndBookDate(designerSeq, date);

        return bookCheck;
    }

    @Override
    public BookListByUserSeqGetRes getBookLitByUserSeq(Long userSeq) {

        // 오늘 날짜 이후로의 예약 내역 받아오기
        List<Book> bookCheckList = bookRepositorySupport.findByUserSeq(userSeq);

        // 총 예약 횟수
        Long visitCount = bookRepositorySupport.findBookCountByUserSeq(userSeq);

        // 디자이너별 예약 횟수
        List<BookListByUserSeqGetRes.Designer> visitCountGroupByDesigner = bookRepositorySupport.findVisitCountGroupByDesigner(userSeq);

        BookListByUserSeqGetRes bookListByUserSeqGetRes = BookListByUserSeqGetRes.builder()
                .bookList(bookCheckList)
                .visitCount(visitCount)
                .designerList(visitCountGroupByDesigner)
                .build();
        return bookListByUserSeqGetRes;
    }

    @Override
    public boolean deleteBookByBookSeq(Long bookSeq) {
        boolean isDeleted = bookRepositorySupport.deleteBookByBookSeq(bookSeq);
        return isDeleted;
    }

    @Override
    public List<Book> getBookLitByDesignerSeqAndBookDate(Long designerSeq, String bookDate) {
        List<Book> bookList = bookRepositorySupport.getBookLitByDesignerSeqAndBookDate(designerSeq, bookDate);
        return bookList;
    }

    @Override
    public Set<LocalDate> getBookListByDesignerSeq(Long designerSeq) {
        List<Book> bookList = bookRepositorySupport.getBookListByDesignerSeq(designerSeq);

        Set<LocalDate> localDateList = new HashSet<>();

        bookList.forEach(book -> {
            LocalDate bookDate = book.getBookDatetime().toLocalDate();
            localDateList.add(bookDate);
        });

        return localDateList;
    }

}
