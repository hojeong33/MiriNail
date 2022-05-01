package com.nail.backend.domain.community.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.nail.backend.domain.community.request.CommunityCommentRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.response.CommunityCommentGetRes;
import com.nail.backend.domain.community.response.CommunityGetRes;
import com.nail.backend.domain.community.service.CommunityService;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaAnswerModifyPutReq;
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
import java.security.Principal;
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
    public ResponseEntity<BaseResponseBody> communityRegister(@RequestPart(value = "communityFiles", required = false) List<MultipartFile> communityFiles,
                                                              @ModelAttribute CommunityRegisterPostReq communityRegisterPostReq,
                                                              Principal principal) throws IOException {

        log.info("communityRegister - 호출");
        String userId = principal.getName();

        Community res = communityService.communityRegister(communityFiles, communityRegisterPostReq, userId);
        if (!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록실패"));
        }
    }

    @Transactional
    @ApiOperation(value = "커뮤니티 글 댓글 작성",
            notes = "communityCommentLayer\" -    1 : 원 댓글작성 , 3 : 대댓글 작성\n" +
                    "  \"communityCommentSeq\"(원댓글Seq) : 대댓글 작성때만 넘겨주세요!,\n"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/comment")
    public ResponseEntity<BaseResponseBody> communityCommentRegister(@RequestBody CommunityCommentRegisterPostReq communityCommentRegisterPostReq,
                                                                     Principal principal) {

        log.info("communityCommentRegister - 호출");
//        String userId = principal.getName();
        String userId = "2217289220";

        System.out.println(communityCommentRegisterPostReq);
        CommunityComment res = communityService.communityCommentRegister(communityCommentRegisterPostReq, userId);
        if (!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록실패"));
        }
    }

    //    READ___________________________________________
    @ApiOperation(value = "커뮤니티 글 전체조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping
    public ResponseEntity<Page<CommunityGetRes>> getCommunityList(@PageableDefault(page = 0, size = 10, sort = "communitySeq", direction = Sort.Direction.DESC) Pageable pageable) {

        log.info("getCommunityList - 호출");
        Page<CommunityGetRes> communityList = communityService.getCommunityList(pageable);

        return ResponseEntity.status(200).body(communityList);
    }

    @ApiOperation(value = "내가 쓴 커뮤니티 글 전체조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping("/user")
    public ResponseEntity<Page<CommunityGetRes>> getCommunityListByUser(@PageableDefault(page = 0, size = 10, sort = "communitySeq", direction = Sort.Direction.DESC) Pageable pageable, Principal principal) {

        log.info("getCommunityListByUser - 호출");
        String userId ="2210624673"; // 2번 유저 - 호정
//        String userId = principal.getName();

        Page<CommunityGetRes> communityList = communityService.getCommunityListByUser(pageable,userId);

        return ResponseEntity.status(200).body(communityList);
    }

    // 댓글은 따로 넘겨주자!
    @ApiOperation(value = "커뮤니티 글 상세조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })

    @GetMapping("/{communitySeq}")
    public ResponseEntity<CommunityGetRes> getCommunity(@PathVariable("communitySeq") Long communitySeq) {

        log.info("getCommunity - 호출");
        CommunityGetRes community = communityService.getCommunity(communitySeq);

        return ResponseEntity.status(200).body(community);
    }

    @ApiOperation(value = "커뮤니티 댓글 조회 - (답글 제외)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })

    @GetMapping("/comment/{communitySeq}")
    public ResponseEntity<Page<CommunityCommentGetRes>> getCommunityComment(@PageableDefault(page = 0, size = 10, sort = "communityCommentSeq",  direction = Sort.Direction.DESC) Pageable pageable,
                                                                     @PathVariable("communitySeq") Long communitySeq) {

        log.info("getCommunityComment - 호출");
        Page<CommunityCommentGetRes> communityComment = communityService.getCommunityComment(pageable,communitySeq);

        return ResponseEntity.status(200).body(communityComment);
    }


    @ApiOperation(value = "커뮤니티 댓글 답글(만) 조회 ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })

    @GetMapping("/comment/layer/{communityCommentSeq}")
    public ResponseEntity<Page<CommunityCommentGetRes>> getCommunityCommentLayer(@PageableDefault(page = 0, size = 10, sort = "communityCommentSeq",  direction = Sort.Direction.DESC) Pageable pageable,
                                                                            @PathVariable("communityCommentSeq") Long communityCommentSeq) {

        log.info("getCommunityCommentLayer - 호출");
        Page<CommunityCommentGetRes> communityComment = communityService.getCommunityCommentLayer(pageable,communityCommentSeq);

        return ResponseEntity.status(200).body(communityComment);
    }


//    UPDATE_________________________________________

    @Transactional
    @ApiOperation(value ="커뮤니티 댓글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 성공"),
            @ApiResponse(code = 404, message = "수정 실패")
    })
    @PutMapping("/comment")
    public ResponseEntity<BaseResponseBody> communityCommentUpdate(@RequestBody CommunityCommentModifyPutReq communityCommentModifyPutReq){
        log.info("communityCommentUpdate - 호출");

        if(communityService.communityCommentModify(communityCommentModifyPutReq)== 0) {
            log.error("communityCommentModify - This communityCommentSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"수정 실패"));
        }
        else
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"수정 성공"));
    }


//    DELETE_________________________________________
    @Transactional
    @ApiOperation(value = "커뮤니티 글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패")
    })
    @DeleteMapping("/{communitySeq}")
    public ResponseEntity<BaseResponseBody> communityRemove(@ApiParam(value = "커뮤니티 글 번호") @PathVariable Long communitySeq) {
        log.info("communityRemove - 호출");

        if (communityService.communityRemove(communitySeq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제성공"));
        } else {
            log.error("communityRemove - This communitySeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "삭제실패"));
        }

    }

    @Transactional
    @ApiOperation(value = "커뮤니티 댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패")
    })
    @PatchMapping("comment/{communityCommentSeq}")
    public ResponseEntity<BaseResponseBody> communityCommentRemove(@ApiParam(value = "커뮤니티 댓글 번호") @PathVariable Long communityCommentSeq) {
        log.info("communityCommentRemove - 호출");

        if (communityService.communityCommentRemove(communityCommentSeq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제성공"));
        } else {
            log.error("communityRemove - This communityCommentSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "삭제실패"));
        }


    }
}