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

    QBook qBook = QBook.book;

    public boolean bookRegister(BookPostReq bookPostReq) {

        User user = userRepository.findByUserSeq(bookPostReq.getUserSeq());
        DesignerInfo designerInfo = designerInfoRepository.findByDesignerSeq(bookPostReq.getDesignerSeq());
        Nailart nailart = nailartRepository.findByNailartSeq(bookPostReq.getNailartSeq());

        Long execute = jpaQueryFactory.update(qBook)
                .set(qBook.user, user)
                .set(qBook.designerInfo, designerInfo)
                .set(qBook.nailart, nailart)
                .set(qBook.bookComment, bookPostReq.getBookComment())
                .set(qBook.bookRegedAt, LocalDateTime.now())
                .where(qBook.bookSeq.eq(bookPostReq.getBookSeq()))
                .execute();

        if(execute < 1) return false;
        return  true;
    }
}
