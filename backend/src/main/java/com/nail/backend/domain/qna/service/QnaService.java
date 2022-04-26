package com.nail.backend.domain.qna.service;

import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaAnswerRegisterPostReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface QnaService {



//    CREATE_________________________________________
    Qna qnaRegister(MultipartFile qnaFile, QnaRegisterPostReq qnaRegisterPostReq, Long userSeq)throws IOException;
    QnaAnswer qnaAnswerRegister(QnaAnswerRegisterPostReq qnaAnswerRegisterPostReq);

//    READ___________________________________________
    Qna getQna(Long qnaSeq);
    Page<Qna> getQnaListByUser(Pageable pageable, Long userSeq);
    Page<Qna> getQnaListByDesignerSeq(Pageable pageable, Long designerSeq);
    Page<Qna> getQnaListByNailart(Pageable pageable, Long nailartSeq);

//    UPDATE_________________________________________
    Long qnaModify(QnaModifyPutReq qnaModifyPutReq);
    Long qnaAnswerModify(QnaAnswerModifyPutReq qnaAnswerModifyPutReq);
//    DELETE_________________________________________
    boolean qnaRemove(Long qnaSeq);
    boolean qnaAnswerRemove(Long qnaAnswerSeq);

}
