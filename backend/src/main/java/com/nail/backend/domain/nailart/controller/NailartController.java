package com.nail.backend.domain.nailart.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.response.NailartDetailGetRes;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import com.nail.backend.domain.nailart.service.NailartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public List<NailartListGetRes> nailartList(@RequestParam int page, @RequestParam int size){
        return nailartService.nailartList(page, size);
    }

    // Nailart nailartSeq로 작품 상세 조회
    @GetMapping("/detail/{nailartSeq}")
    public NailartDetailGetRes nailartDetail(@PathVariable("nailartSeq") long nailartSeq){
        return nailartService.nailartDetail(nailartSeq);
    }

    // Nailart designerSeq로 최대 10개 조회
    @GetMapping("/designer/{designerSeq}")
    public List<NailartListGetRes> anotherNailart(@PathVariable("designerSeq") long designerSeq){
        return nailartService.anotherNailart(designerSeq);
    }

    @GetMapping("/designer")
    public Page<Nailart> nailartListByDesignerSeq(@RequestParam long designerSeq , @RequestParam int page, @RequestParam int size){
        return nailartService.getdesignerNailartList(designerSeq, page, size);
    }

    // Nailart 등록
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Void> test(@RequestPart("files")List<MultipartFile> files, @RequestParam("jsonList") String jsonList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        NailartRegisterPostReq nailartRegisterPostReq = objectMapper.readValue(jsonList, new TypeReference<NailartRegisterPostReq>() {});
        log.info("files count : {}",files);
        log.info("json text) : {}",nailartRegisterPostReq);
        nailartService.nailartRegister(nailartRegisterPostReq, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }


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
