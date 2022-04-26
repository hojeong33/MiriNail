package com.nail.backend.domain.community.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.service.CommunityService;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Slf4j
@Api("소통 게시판 API")
@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    CommunityService communityService;


//    CREATE_________________________________________

    @Transactional
    @ApiOperation(value = "커뮤니티 글 작성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping
    public ResponseEntity<BaseResponseBody> communityRegister(@RequestPart List<MultipartFile> communityFiles, @ModelAttribute CommunityRegisterPostReq communityRegisterPostReq)throws IOException {

        log.info("communityRegister - 호출");
        Long userSeq = Long.valueOf(1L);
        Community res = communityService.communityRegister(communityFiles,communityRegisterPostReq,userSeq);
        if(!res.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"등록실패"));
        }
    }

//    READ___________________________________________

//    UPDATE_________________________________________

//    DELETE_________________________________________
}
