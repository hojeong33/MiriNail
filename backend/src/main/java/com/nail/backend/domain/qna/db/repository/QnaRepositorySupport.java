package com.nail.backend.domain.qna.db.repository;


import com.nail.backend.domain.qna.db.entity.QQna;
import com.nail.backend.domain.qna.db.entity.QQnaAnswer;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

public class QnaRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;


    QQna qQna = QQna.qna;
    QQnaAnswer qQnaAnswer = QQnaAnswer.qnaAnswer;

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

    @Transactional
    public Long updateQnaAnswerByQnaAnserSeq(QnaAnswerModifyPutReq qnaAnswerModifyPutReq){
        long execute = jpaQueryFactory.update(qQnaAnswer)
                .set(qQnaAnswer.qnaAnswerDesc,qnaAnswerModifyPutReq.getQnaAnswerDesc())
                .set(qQnaAnswer.qnaAnswerRegedAt, LocalDateTime.now())
                .where(qQnaAnswer.qnaAnswerSeq.eq(qnaAnswerModifyPutReq.getQnaAnswerSeq()))
                .execute();
        return execute;
    }

//    DELETE_________________________________________

}
