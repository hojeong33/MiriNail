package com.nail.backend.domain.qna.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.qna.db.repository.QnaAnswerRepository;
import com.nail.backend.domain.qna.db.repository.QnaRepository;
import com.nail.backend.domain.qna.db.repository.QnaRepositorySupport;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaAnswerRegisterPostReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service("QnaService")
public class QnaServiceImpl implements QnaService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    QnaRepository qnaRepository;

    @Autowired
    QnaRepositorySupport qnaRepositorySupport;

    @Autowired
    QnaAnswerRepository qnaAnswerRepository;

    @Autowired
    AwsS3Service awsS3Service;

//    CREATE_________________________________________
    @Override
    @Transactional
    public Qna qnaRegister(MultipartFile qnaFile, QnaRegisterPostReq qnaRegisterPostReq, Long userSeq) throws IOException {

        // file 업로드
        String fileName  = awsS3Service.createFileName(qnaFile.getOriginalFilename());

        //파일 객체 생성
//        System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir")+ fileName);

        //파일 저장
        qnaFile.transferTo(file);

        //S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);

        //주소 할당
        String qnaFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

        //파일 삭제
        file.delete();


        // 나머지 객체 만들기

        Qna qna = Qna.builder()
                .userSeq(userSeq)
                .qnaTitle(qnaRegisterPostReq.getQnaTitle())
                .qnaDesc(qnaRegisterPostReq.getQnaDesc())
                .qnaImgUrl(qnaFileUrl)
                .qnaDesignerSeq(qnaRegisterPostReq.getQnaDesignerSeq())
                .qnaNailartSeq(qnaRegisterPostReq.getQnaNailartSeq())
                .qnaIsPrivated(qnaRegisterPostReq.isQnaIsPrivated())
                .qnaRegedAt(LocalDateTime.now())
                .build();

        Qna saveQna = qnaRepository.save(qna);
        return saveQna;
    }

    @Override
    @Transactional
    public QnaAnswer qnaAnswerRegister(QnaAnswerRegisterPostReq qnaAnswerRegisterPostReq){

        QnaAnswer qnaAnswer = QnaAnswer.builder()
                .qnaSeq(qnaAnswerRegisterPostReq.getQnaSeq())
                .qnaAnswerDesc(qnaAnswerRegisterPostReq.getQnaAnswerDesc())
                .build();
        QnaAnswer saveQnaAnswer = qnaAnswerRepository.save(qnaAnswer);

        // 답변 여부 update
        qnaRepositorySupport.updateIsAnswered(qnaAnswerRegisterPostReq.getQnaSeq());

        return saveQnaAnswer;
    }



//    READ___________________________________________
    @Override
    @Transactional
    public Qna getQna(Long qnaSeq){
        Qna qna = qnaRepository.findById(qnaSeq).orElse(null);
        return qna;
    }

    @Override
    @Transactional
    public Page<Qna> getQnaListByUser(Pageable pageable, Long userSeq){
        Page<Qna> qnaList = qnaRepository.findAllByUserSeq(pageable,userSeq);
        if (qnaList.stream().count() == 0) {  // Qna 없으면
            return null;
        }
        return qnaList;
    }

    @Override
    @Transactional
    public Page<Qna> getQnaListByDesignerSeq(Pageable pageable, Long designerSeq){
        Page<Qna> qnaList = qnaRepository.findAllByQnaDesignerSeq(designerSeq, pageable);
        if (qnaList.stream().count() == 0) {  // Qna 없으면
            return null;
        }
        return qnaList;
    }

    @Override
    @Transactional
    public Page<Qna> getQnaListByNailart(Pageable pageable, Long nailartSeq){
        Page<Qna> qnaList = qnaRepository.findAllByQnaNailartSeq(pageable,nailartSeq);
        if (qnaList.stream().count() == 0) {  // Qna 없으면
            return null;
        }
        return qnaList;
    }


//    UPDATE_________________________________________

    @Override
    @Transactional
    public Long qnaModify(QnaModifyPutReq qnaModifyPutReq){

        // 해당 Qna가 존재하면 수정, 존재하지 않으면 0 반환

        if(qnaRepository.findById(qnaModifyPutReq.getQnaSeq()).isPresent()){
            Long execute = qnaRepositorySupport.updateQnaByQnaSeq(qnaModifyPutReq);
            return execute;
        }
        else return 0L;
    }

    @Override
    @Transactional
    public  Long qnaAnswerModify(QnaAnswerModifyPutReq qnaAnswerModifyPutReq){

        //해당 QnaAnswer가 존재하면 수정, 존재하지 않으면 0 반환
        if(qnaAnswerRepository.findById(qnaAnswerModifyPutReq.getQnaAnswerSeq()).isPresent()){
            Long execute = qnaRepositorySupport.updateQnaAnswerByQnaAnserSeq(qnaAnswerModifyPutReq);
            return execute;
        }
        else return 0L;
    }
//    DELETE_________________________________________

    @Override
    @Transactional
    public boolean qnaRemove(Long qnaSeq){

        if(qnaRepository.findById(qnaSeq).isPresent()){
            qnaRepository.deleteById(qnaSeq);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean qnaAnswerRemove(Long qnaAnswerSeq){

        if(qnaAnswerRepository.findById(qnaAnswerSeq).isPresent()){
            qnaAnswerRepository.deleteById(qnaAnswerSeq);
            return true;
        }
        return false;
    }
}
