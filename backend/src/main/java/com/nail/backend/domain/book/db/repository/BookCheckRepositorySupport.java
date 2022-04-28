package com.nail.backend.domain.book.db.repository;

import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.db.entity.QBookCheck;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class BookCheckRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    BookCheckRepository bookCheckRepository;

    QBookCheck qBookCheck = QBookCheck.bookCheck;

    public BookCheck findByDesignerSeqAndBookDate(Long designerSeq, LocalDate bookDate) {

        BookCheck bookCheck = jpaQueryFactory.select(qBookCheck)
                .from(qBookCheck)
                .where(qBookCheck.designerSeq.eq(designerSeq)
                        .and(qBookCheck.bookCheckDate.eq(bookDate)))
                .fetchOne();

        // 해당 사항이 없다 => 생성
        if(bookCheck == null) {
            bookCheck = BookCheck.builder()
                    .designerSeq(designerSeq)
                    .bookCheckDate(bookDate)    // 다른값들은 기본값 설정이 되어있기 때문에 안넣어줘도됨.
                    .build();

            bookCheckRepository.save(bookCheck);
        }
        return bookCheck;
    }
}
