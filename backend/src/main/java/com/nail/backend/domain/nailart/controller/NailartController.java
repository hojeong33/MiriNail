package com.nail.backend.domain.nailart.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.service.NailartService;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.plaf.multi.MultiListUI;
import java.util.List;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/nailart")
@Slf4j
public class NailartController {

    @Autowired
    NailartService nailartService;

    // Nailart 리스트 전체 조회
    @GetMapping("/list")
    public Page<Nailart> nailartList(@RequestParam int page, @RequestParam int size){
        System.out.println("!!!!!!!!!!!!!!!!!!!!!");
        return nailartService.nailartList(page, size);
    }

    // Nailart nailartSeq로 작품 상세 조회
    @GetMapping("/detail/{nailartSeq}")
    public Nailart nailartDetail(@PathVariable("nailartSeq") long nailartSeq){
        return nailartService.nailartDetail(nailartSeq);
    }

    // Nailart designerSeq로 전체 조회

    // Nailart 등록




//    @PostMapping(consumes = {"multipart/form-data" })
//    public ResponseEntity<BaseResponseBody> nailartRegisterPost(@RequestPart NailartRegisterPostReq nailartRegisterPostReq, @RequestPart(required = false) List<MultipartFile> multipartFiles){
//        log.info("디자이너 번호 : {}, 작품 이름 : {}, 작품 설명 : {}, 작품 타입 : {}, 작품 색상 : {}, 작품 상세 색상 : {}, 작품 날씨 : {}, 작품 가격{}"
//                    , nailartRegisterPostReq.getDesignerSeq() , nailartRegisterPostReq.getNailartName(), nailartRegisterPostReq.getNailartDesc()
//                    , nailartRegisterPostReq.getNailartType(), nailartRegisterPostReq.getNailartColor(), nailartRegisterPostReq.getNailartDetailColor()
//                    , nailartRegisterPostReq.getNailartWeather(), nailartRegisterPostReq.getNailartPrice());
//
//        System.out.println("test");
//        nailartService.nailartRegister(nailartRegisterPostReq, multipartFiles);


    // 이건 리스트 목록만 받아짐
//    @PostMapping(consumes = {"multipart/form-data" })
//    public String uploadMulti(@RequestParam("files") List<MultipartFile> files) {
//        System.out.println(files);
//        return "uploaded";
//    }

    //이건 테스트중
//    @PostMapping(consumes = {"multipart/form-data" })
//    public ResponseEntity<Void> test(@RequestPart(value = "files",required = false) List<MultipartFile> files, @RequestParam(value="nailartRegisterPostReq",required = false) String nailartRegisterPostReq) {
//        System.out.println(nailartRegisterPostReq);
//        System.out.println(files.size());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Void> test(@RequestPart("files")List<MultipartFile> files, @RequestParam("jsonList") String jsonList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        NailartRegisterPostReq nailartRegisterPostReq = objectMapper.readValue(jsonList, new TypeReference<NailartRegisterPostReq>() {});
        nailartRegisterPostReq.setDesignerSeq(1);
        log.info("files count : {}",files);
        log.info("json text) : {}",nailartRegisterPostReq);
        nailartService.nailartRegister(nailartRegisterPostReq, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }



//    @PostMapping(consumes = {"multipart/form-data" })
//    public ResponseEntity<BaseResponseBody> nailartRegisterPost(@RequestParam(required = false) NailartRegisterPostReq nailartRegisterPostReq, @RequestParam("files") List<MultipartFile> files){
//        log.info("디자이너 번호 : {}, 작품 이름 : {}, 작품 설명 : {}, 작품 타입 : {}, 작품 색상 : {}, 작품 상세 색상 : {}, 작품 날씨 : {}, 작품 가격{}"
//                    , nailartRegisterPostReq.getDesignerSeq() , nailartRegisterPostReq.getNailartName(), nailartRegisterPostReq.getNailartDesc()
//                    , nailartRegisterPostReq.getNailartType(), nailartRegisterPostReq.getNailartColor(), nailartRegisterPostReq.getNailartDetailColor()
//                    , nailartRegisterPostReq.getNailartWeather(), nailartRegisterPostReq.getNailartPrice());
//        log.info("images : {} " ,files);
//        System.out.println(nailartRegisterPostReq);
//        System.out.println(files);
//        nailartService.nailartRegister(nailartRegisterPostReq, multipartFiles);
//
//        return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Success"));
//    }

    // Nailart 수정

    // Nailart 삭제
    @DeleteMapping("/{nailartSeq}")
    public ResponseEntity<BaseResponseBody> nailartRemove(@PathVariable long nailartSeq){
        if (nailartService.nailartRemove(nailartSeq)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This nailartSeq dosen't exist."));
        }
    }



}
