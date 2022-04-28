package com.nail.backend.domain.qna.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.db.entity.QnaAnswer;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
import com.nail.backend.domain.qna.request.QnaAnswerRegisterPostReq;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import com.nail.backend.domain.qna.response.QnaGetRes;
import com.nail.backend.domain.qna.service.QnaService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;

@Slf4j
@Api(value = "문의 관리 Api")
@RestController
@RequestMapping("/api/qna")
public class QnaContoroller {

    @Autowired
    QnaService qnaService;


//    CREATE_________________________________________
    @Transactional
    @ApiOperation(value = "작품 문의 글 작성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/nailart")
    public ResponseEntity<BaseResponseBody> qnaOfNailRegister(@RequestPart(value = "qnaFile", required = false) MultipartFile qnaFile , @ModelAttribute QnaRegisterPostReq qnaRegisterPostReq)throws IOException {

        log.info("qnaOfNailRegister - 호출");
        Qna res = qnaService.qnaOfNailRegister(qnaFile, qnaRegisterPostReq);
        if(!res.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"등록실패"));
        }
    }
    @Transactional
    @ApiOperation(value = "디자이너 개인 문의 글 작성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/designer")
    public ResponseEntity<BaseResponseBody> qnaToDesignerRegister(@RequestBody QnaRegisterPostReq qnaRegisterPostReq) {

        log.info("qnaToDesignerRegister - 호출");
        Qna res = qnaService.qnaToDesignerRegister(qnaRegisterPostReq);
        if(!res.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"등록실패"));
        }
    }

    @Transactional
    @ApiOperation(value = "문의 답변 작성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/answer")
    public ResponseEntity<BaseResponseBody> qnaAnswerRegister(@RequestBody QnaAnswerRegisterPostReq qnaAnswerRegisterPostReq){

        log.info("qnaAnswerRegister - 호출");
        QnaAnswer res = qnaService.qnaAnswerRegister(qnaAnswerRegisterPostReq);
        System.out.println(res);
        if(!res.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"등록 실패"));
        }
    }






//    READ___________________________________________

    @ApiOperation(value = "1:1 문의 상세조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/{qnaSeq}")
    public ResponseEntity<Qna> getQna(@ApiParam(value = "qnaSeq") @PathVariable("qnaSeq") Long qnaSeq){

        log.info("getQna - 호출");
        Qna qna = qnaService.getQna(qnaSeq);

        return ResponseEntity.status(200).body(qna);
    }


    @ApiOperation(value = "유저가 작성한 1:1 문의 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/user/{userSeq}/{qnaType}")
    public ResponseEntity<Page<QnaGetRes>> getQnaListByUser(@PageableDefault(page=0, size =10,sort= "qnaSeq",direction = Sort.Direction.DESC) Pageable pageable,
                                                      @ApiParam(value = "유저Seq") @PathVariable("userSeq") Long userSeq,
                                                      @ApiParam(value = "문의유형") @PathVariable("qnaType") int qnaType){

        log.info("getQnaListByUser - 호출");
        Page<QnaGetRes> qnaList = qnaService.getQnaListByUser(pageable,userSeq,qnaType);

        return ResponseEntity.status(200).body(qnaList);
    }

    @ApiOperation(value = "디자이너에게 작성된 1:1 문의 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/designer/{designerSeq}/{qnaType}")
    public ResponseEntity<Page<QnaGetRes>> getQnaListByDesignerSeq(@PageableDefault(page=0, size =10,sort= "qnaSeq",direction = Sort.Direction.DESC) Pageable pageable,
                                                             @ApiParam(value = "디자이너Seq") @PathVariable("designerSeq") Long designerSeq,
                                                             @ApiParam(value = "문의유형") @PathVariable("qnaType") int qnaType){

        log.info("getQnaListByDesignerSeq - 호출");
        Page<QnaGetRes> qnaList = qnaService.getQnaListByDesignerSeq(pageable,designerSeq,qnaType);

        return ResponseEntity.status(200).body(qnaList);
    }


    @ApiOperation(value = "작품별 작성된 1:1 문의 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/nailart/{nailartSeq}")
    public ResponseEntity<Page<QnaGetRes>> getQnaListByNailart(@PageableDefault(page=0, size =10,sort= "qnaSeq",direction = Sort.Direction.DESC) Pageable pageable,
                                                               @ApiParam(value = "작품Seq") @PathVariable("nailartSeq") Long nailartSeq){

        log.info("getQnaListByNailart - 호출");
        Page<QnaGetRes> qnaList = qnaService.getQnaListByNailart(pageable,nailartSeq);

        return ResponseEntity.status(200).body(qnaList);
    }
//    UPDATE_________________________________________
    @Transactional
    @ApiOperation(value = "문의 글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 성공"),
            @ApiResponse(code = 404, message = "수정 실패")
    })
    @PutMapping
    public ResponseEntity<BaseResponseBody> qnaUpdate(@RequestBody QnaModifyPutReq qnaModifyPutReq){
        log.info("qnaModify - 호출");

        if(qnaService.qnaModify(qnaModifyPutReq)== 0) {
            log.error("qnaModify - This qnaSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"수정 실패"));
        }
        else
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"수정 성공"));
    }

    @Transactional
    @ApiOperation(value ="문의 답변 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 성공"),
            @ApiResponse(code = 404, message = "수정 실패")
    })
    @PutMapping("/answer")
    public ResponseEntity<BaseResponseBody> qnaAnswerUpdate(@RequestBody QnaAnswerModifyPutReq qnaAnswerModifyPutReq){
        log.info("qnaAnswerModify - 호출");

        if(qnaService.qnaAnswerModify(qnaAnswerModifyPutReq)== 0) {
            log.error("qnaAnswerModify - This qnaSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"수정 실패"));
        }
        else
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"수정 성공"));
    }

//    DELETE_________________________________________
    @Transactional
    @ApiOperation(value = "문의 글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패")
    })
    @DeleteMapping("/{qnaSeq}")
    public ResponseEntity<BaseResponseBody> qnaRemove(@ApiParam(value = "qna 번호") @PathVariable Long qnaSeq){
        log.info("qnaDelete - 호출");

        if(qnaService.qnaRemove(qnaSeq)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,"삭제 성공"));
        }
        else{
            log.error("qnaDelete - This qnaSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"삭제 실패"));
        }
    }

    @Transactional
    @ApiOperation(value = "문의 답변 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패")
    })
    @DeleteMapping("/answer/{qnaAnswerSeq}")
    public ResponseEntity<BaseResponseBody> qnaAnswerRemove(@ApiParam(value ="qna Answer번호") @PathVariable Long qnaAnswerSeq){
        log.info("qnaAnswerDelete - 호출");

        if(qnaService.qnaAnswerRemove(qnaAnswerSeq)){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,"삭제성공"));
        }
        else{
            log.error("qnaAnswerDelete - This qnaAnswerSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"삭제실패"));
        }

    }
}
