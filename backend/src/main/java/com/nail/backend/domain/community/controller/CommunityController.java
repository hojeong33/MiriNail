package com.nail.backend.domain.community.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.service.CommunityService;
import com.nail.backend.domain.qna.db.entity.Qna;
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
    @ApiOperation(value = "커뮤니티 글 전체조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping
    public ResponseEntity<Page<Community>> getCommunity(@PageableDefault(page=0, size =10,sort = "communitySeq",direction = Sort.Direction.DESC) Pageable pageable){

        log.info("getCommunity - 호출");
        Page<Community> communityList = communityService.getCommunity(pageable);

        return ResponseEntity.status(200).body(communityList);
    }

//    UPDATE_________________________________________

//    DELETE_________________________________________
}
