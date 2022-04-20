package com.nail.backend.domain.qna.service;

import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaAnswerRegisterPostReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;

public interface QnaService {



//    CREATE_________________________________________
    Qna qnaRegister(QnaRegisterPostReq qnaRegisterPostReq, Long userId);
    QnaAnswer qnaAnswerRegister(QnaAnswerRegisterPostReq qnaAnswerRegisterPostReq);

//    READ___________________________________________
//    UPDATE_________________________________________
    Long qnaModify(QnaModifyPutReq qnaModifyPutReq);
    Long qnaAnswerModify(QnaAnswerModifyPutReq qnaAnswerModifyPutReq);
//    DELETE_________________________________________
    boolean qnaRemove(Long qnaSeq);
    boolean qnaAnswerRemove(Long qnaAnswerSeq);

}
