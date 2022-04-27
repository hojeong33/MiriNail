package com.nail.backend.domain.book.db.repository;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.QBook;
import com.nail.backend.domain.book.request.BookPostReq;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

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

    QBook qBook = QBook.book;

    public Book bookRegister(BookPostReq bookPostReq) {

        User user = userRepository.findByUserSeq(bookPostReq.getUserSeq());
        DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(bookPostReq.getDesignerSeq());
        Nailart nailart = nailartRepository.findByNailartSeq(bookPostReq.getNailartSeq());

        Book book = Book.builder()
                .user(user)
                .designerInfo(designerInfo)
                .nailart(nailart)
                .bookComment(bookPostReq.getBookComment())
                .bookDatetime(bookPostReq.getBookDatetime())
                .bookRegedAt(LocalDateTime.now())
                .build();

        bookRepository.save(book);
        return book;
    }
}
