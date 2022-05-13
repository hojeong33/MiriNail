package com.nail.backend.domain.nailart.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.nailart.request.NailartUpdatePutReq;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import com.nail.backend.domain.nailart.service.NailartService;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.response.NailartDetailGetRes;
import com.nail.backend.domain.review.response.ReviewGetRes;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public List<NailartListGetRes> nailartList(@RequestParam String category, @RequestParam String color, @RequestParam String type, @RequestParam String sort, @RequestParam int page, @RequestParam int size){

        return nailartService.nailartList(category, color, type, sort, page, size);
    }

    // Nailart nailartSeq로 작품 상세 조회
    @GetMapping("/detail/{nailartSeq}")
    public NailartDetailGetRes nailartDetail(@PathVariable("nailartSeq") long nailartSeq){
        return nailartService.nailartDetail(nailartSeq);
    }

    // Nailart designerSeq로 최대 10개 조회(현재 작품 제외)
    @GetMapping("/designer/{designerSeq}/{nailartSeq}")
    public List<NailartListGetRes> anotherNailart(@PathVariable("designerSeq") long designerSeq, @PathVariable("nailartSeq") long nailartSeq){
        return nailartService.otherNailart(designerSeq, nailartSeq);
    }

    @GetMapping("/designer")
    public List<Nailart> nailartListByDesignerSeq(@RequestParam long designerSeq , @RequestParam int page, @RequestParam int size){
        return nailartService.getdesignerNailartList(designerSeq, page, size);
    }

    // Nailart 등록
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Void> nailartRegister(@RequestPart("files")List<MultipartFile> files, @RequestParam("jsonList") String jsonList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        NailartRegisterPostReq nailartRegisterPostReq = objectMapper.readValue(jsonList, new TypeReference<NailartRegisterPostReq>() {});
        nailartService.nailartRegister(nailartRegisterPostReq, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Nailart 수정
    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<Void> nailartUpdate(@RequestPart("files")List<MultipartFile> files, @RequestParam("jsonList") String jsonList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        NailartUpdatePutReq nailartUpdatePutReq = objectMapper.readValue(jsonList, new TypeReference<NailartUpdatePutReq>() {});
        nailartService.nailartUpdate(nailartUpdatePutReq, files);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Nailart available update
    @PutMapping("/{nailartSeq}")
    public ResponseEntity<BaseResponseBody> nailartAvailableUpdate(@PathVariable long nailartSeq){
        System.out.println("check");
        if (nailartService.nailartAvailableUpdate(nailartSeq)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This nailartSeq dosen't exist."));
        }
    }


    // 이삭 작성 ------------------------------------------------------------------------------------------------
    // 네일아트 검색
    @ApiOperation(value = "네일아트 검색조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/search/{name}")
    public ResponseEntity<Page<NailartListGetRes>> getNailartListByNailartName(@PageableDefault(page = 0, size = 10, sort = "nailartSeq", direction = Sort.Direction.DESC) Pageable pageable,
                                                                        @ApiParam(value = "네일 아트 이름") @PathVariable String name) {

        log.info("getNailartListByNailartName - 호출");
        Page<NailartListGetRes> nailartList = nailartService.getNailartListByNailartName(pageable,name);

        return ResponseEntity.status(200).body(nailartList);
    }

}
