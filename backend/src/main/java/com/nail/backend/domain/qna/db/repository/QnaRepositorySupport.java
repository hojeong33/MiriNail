package com.nail.backend.domain.qna.db.repository;


import com.nail.backend.domain.qna.db.entity.QQna;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

public class QnaRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;


    QQna qQna = QQna.qna;

//    CREATE_________________________________________


//    READ___________________________________________
//    UPDATE_________________________________________
    @Transactional
    public Long updateQnaByQnaSeq(QnaModifyPutReq qnaModifyPutReq){
        long execute = jpaQueryFactory.update(qQna)
                .set(qQna.qnaTitle,qnaModifyPutReq.getQnaTitle())
                .set(qQna.qnaDesc,qnaModifyPutReq.getQnaDesc())
                .where(qQna.qnaSeq.eq(qnaModifyPutReq.getQnaSeq()))
                .execute();
        return execute;
    }
//    DELETE_________________________________________

}
