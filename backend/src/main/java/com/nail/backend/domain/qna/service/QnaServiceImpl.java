package com.nail.backend.domain.qna.service;


import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.repository.QnaRepository;
import com.nail.backend.domain.qna.db.repository.QnaRepositorySupport;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service("QnaService")
public class QnaServiceImpl implements QnaService {

    @Autowired
    QnaRepository qnaRepository;

    @Autowired
    QnaRepositorySupport qnaRepositorySupport;

    @Autowired
    AwsS3Service awsS3Service;

//    CREATE_________________________________________
    @Override
    @Transactional
    public Qna qnaRegister(QnaRegisterPostReq qnaRegisterPostReq, Long userId) {

        // file 업로드
        MultipartFile uploadFile = qnaRegisterPostReq.getFile();
        String fileName  = awsS3Service.createFileName(uploadFile.getOriginalFilename());

        //파일 객체 생성
        //System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir")+ fileName);

        //파일 저장
        uploadFile.transferTo(file);

        //S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);

        //주소 할당
        String uploadFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

        //파일 삭제
        file.delete();


        // 나머지 객체 만들기

        Qna qna = Qna.builder()
                .userSeq(userId)
                .qnaTitle(qnaRegisterPostReq.getQnaTitle())
                .qnaDesc(qnaRegisterPostReq.getQnaDesc())
                .qnaImgUrl(uploadFileUrl)
                .qnaDesignerSeq(qnaRegisterPostReq.getQnaDesignerSeq())
                .qnaNailartSeq(qnaRegisterPostReq.getQnaNailartSeq())
                .qnaIsPrivated(qnaRegisterPostReq.isQnaIsPrivated())
                .qnaRegedAt(LocalDateTime.now())
                .build();

        Qna saveQna = qnaRepository.save(qna);


        return saveQna;
    }
//    READ___________________________________________
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
}
