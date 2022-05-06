package com.nail.backend.domain.book.db.repository;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.db.entity.QBook;
import com.nail.backend.domain.book.db.entity.QBookCheck;
import com.nail.backend.domain.follow.request.BookPostReq;
import com.nail.backend.domain.book.response.BookListByUserSeqGetRes;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DesignerInfoRepository designerInfoRepository;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    BookCheckRepository bookCheckRepository;

    QBook qBook = QBook.book;

    QBookCheck qBookCheck = QBookCheck.bookCheck;

    public Book bookRegister(BookPostReq bookPostReq) {

        User user = userRepository.findByUserSeq(bookPostReq.getUserSeq());
        DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(bookPostReq.getDesignerSeq());
        Nailart nailart = nailartRepository.findByNailartSeq(bookPostReq.getNailartSeq());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime bookDateTime = LocalDateTime.parse(bookPostReq.getBookDatetime(),formatter);

        Book book = Book.builder()
                .user(user)
                .designerInfo(designerInfo)
                .nailart(nailart)
                .bookComment(bookPostReq.getBookComment())
                .bookDatetime(bookDateTime)
                .bookRegedAt(LocalDateTime.now())
                .build();

        bookRepository.save(book);

        // 해당 예약 찾기
        BookCheck bookCheck = jpaQueryFactory.select(qBookCheck)
                .from(qBookCheck)
                .where(qBookCheck.designerSeq.eq(bookPostReq.getDesignerSeq())
                        .and(qBookCheck.bookCheckDate.eq(bookDateTime.toLocalDate())))
                .fetchFirst();

        // 해당 예약이 없으면
        if(bookCheck == null) {
            bookCheck = BookCheck.builder()
                    .designerSeq(bookPostReq.getDesignerSeq())
                    .bookCheckDate(bookDateTime.toLocalDate())
                    .build();
        }

        // 예약한 시간
        String bookTime = bookDateTime.toLocalTime().toString();

        // 해당시간 예약 처리 -> 이게 맞나..?
        switch (bookTime) {
            case "10:00":
                bookCheck.setAm1000(true);
                break;
            case "10:30":
                bookCheck.setAm1030(true);
                break;
            case "11:00":
                bookCheck.setAm1100(true);
                break;
            case "11:30":
                bookCheck.setAm1130(true);
                break;
            case "12:00":
                bookCheck.setPm1200(true);
                break;
            case "12:30":
                bookCheck.setPm1230(true);
                break;
            case "13:00":
                bookCheck.setPm1300(true);
                break;
            case "13:30":
                bookCheck.setPm1330(true);
                break;
            case "14:00":
                bookCheck.setPm1400(true);
                break;
            case "14:30":
                bookCheck.setPm1430(true);
                break;
            case "15:00":
                bookCheck.setPm1500(true);
                break;
            case "15:30":
                bookCheck.setPm1530(true);
                break;
            case "16:00":
                bookCheck.setPm1600(true);
                break;
            case "16:30":
                bookCheck.setPm1630(true);
                break;
            case "17:00":
                bookCheck.setPm1700(true);
                break;
            case "17:30":
                bookCheck.setPm1730(true);
                break;
            case "18:00":
                bookCheck.setPm1800(true);
                break;
            case "18:30":
                bookCheck.setPm1830(true);
                break;
            case "19:00":
                bookCheck.setPm1900(true);
                break;
        }
        bookCheckRepository.save(bookCheck);
        return book;
    }

    public List<Book> findByUserSeq(Long userSeq) {

        List<Book> bookList = jpaQueryFactory.select(qBook)
                .from(qBook)
                .where(qBook.user.userSeq.eq(userSeq)
                        .and(qBook.bookDatetime.after(LocalDateTime.now())))
                .fetch();

        return bookList;
    }

    public List<Book> findByDesignerSeq(Long designerSeq) {

        List<Book> bookList = jpaQueryFactory.select(qBook)
                .from(qBook)
                .where(qBook.designerInfo.designerSeq.eq(designerSeq))
                .fetch();

        return bookList;
    }

    public boolean deleteBookByBookSeq(Long bookSeq) {

        Book book = jpaQueryFactory.select(qBook)
                .from(qBook)
                .where(qBook.bookSeq.eq(bookSeq))
                .fetchFirst();

        if(book == null) return false;

        Long deignerSeq = book.getDesignerInfo().getDesignerSeq();
        LocalDate bookDate = book.getBookDatetime().toLocalDate();
        String bookTime = book.getBookDatetime().toLocalTime().toString();

        // 해당 예약 찾기
        BookCheck bookCheck = jpaQueryFactory.select(qBookCheck)
                .from(qBookCheck)
                .where(qBookCheck.designerSeq.eq(deignerSeq)
                        .and(qBookCheck.bookCheckDate.eq(bookDate)))
                .fetchFirst();

        switch (bookTime) {
            case "10:00":
                bookCheck.setAm1000(false);
                break;
            case "10:30":
                bookCheck.setAm1030(false);
                break;
            case "11:00":
                bookCheck.setAm1100(false);
                break;
            case "11:30":
                bookCheck.setAm1130(false);
                break;
            case "12:00":
                bookCheck.setPm1200(false);
                break;
            case "12:30":
                bookCheck.setPm1230(false);
                break;
            case "13:00":
                bookCheck.setPm1300(false);
                break;
            case "13:30":
                bookCheck.setPm1330(false);
                break;
            case "14:00":
                bookCheck.setPm1400(false);
                break;
            case "14:30":
                bookCheck.setPm1430(false);
                break;
            case "15:00":
                bookCheck.setPm1500(false);
                break;
            case "15:30":
                bookCheck.setPm1530(false);
                break;
            case "16:00":
                bookCheck.setPm1600(false);
                break;
            case "16:30":
                bookCheck.setPm1630(false);
                break;
            case "17:00":
                bookCheck.setPm1700(false);
                break;
            case "17:30":
                bookCheck.setPm1730(false);
                break;
            case "18:00":
                bookCheck.setPm1800(false);
                break;
            case "18:30":
                bookCheck.setPm1830(false);
                break;
            case "19:00":
                bookCheck.setPm1900(false);
                break;
        }

        bookRepository.delete(book);
        return true;
    }

    public List<Book> getBookLitByDesignerSeqAndBookDate(Long designerSeq, String bookDate) {

        bookDate += " 00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        LocalDateTime localDateTime = LocalDateTime.parse(bookDate,formatter);

        List<Book> bookList = jpaQueryFactory.select(qBook)
                .from(qBook)
                .where(qBook.designerInfo.designerSeq.eq(designerSeq)
                        // 당일 00시 이후
                        .and(qBook.bookDatetime.after(localDateTime))
                        // 내일 00시 이전
                        .and(qBook.bookDatetime.before(localDateTime.plusDays(1L))))
                .fetch();

        return bookList;
    }

    public Long findBookCountByUserSeq(Long userSeq) {
        Long bookCount = jpaQueryFactory.select(qBook.count())
                .from(qBook)
                .where(qBook.user.userSeq.eq(userSeq))
                .fetchFirst();

        return bookCount;
    }

    public List<BookListByUserSeqGetRes.Designer> findVisitCountGroupByDesigner(Long userSeq) {
        List<Tuple> list = jpaQueryFactory.select(qBook.designerInfo, qBook.count())
                .from(qBook)
                .where(qBook.user.userSeq.eq(userSeq))
                .groupBy(qBook.designerInfo)
                .fetch();

        List<BookListByUserSeqGetRes.Designer> designerList = new ArrayList<>(list.size());

        list.forEach(designer -> {
            BookListByUserSeqGetRes.Designer designer1 = new BookListByUserSeqGetRes.Designer();
            designer1.setDesignerInfo(designer.get(qBook.designerInfo));
            designer1.setDesignerCount(designer.get(qBook.count()));

            designerList.add(designer1);
        });

        return designerList;
    }

    public Long deleteByNailartSeq(Long nailartSeq){
        long execute = jpaQueryFactory.delete(qBook)
                .where(qBook.nailart.nailartSeq.eq(nailartSeq))
                .execute();
        return execute;
    }

    public List<Long> findByNailartSeq(Long nailartSeq) {
        List<Long> list = jpaQueryFactory.select(qBook.bookSeq)
                .where(qBook.nailart.nailartSeq.eq(nailartSeq))
                .fetch();
        return list;
    }

    public List<Book> getBookListByDesignerSeq(Long designerSeq) {
        List<Book> bookList = jpaQueryFactory.select(qBook)
                .from(qBook)
                .where(qBook.designerInfo.designerSeq.eq(designerSeq))
                .fetch();
        return bookList;

    }
}
