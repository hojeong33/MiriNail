package com.nail.backend.domain.qna.service;

import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;

public interface QnaService {



//    CREATE_________________________________________
    Qna qnaRegister(QnaRegisterPostReq qnaRegisterPostReq, Long userId);


//    READ___________________________________________
//    UPDATE_________________________________________
    Long qnaModify(QnaModifyPutReq qnaModifyPutReq);
//    DELETE_________________________________________
    boolean qnaRemove(Long qnaSeq);

}
