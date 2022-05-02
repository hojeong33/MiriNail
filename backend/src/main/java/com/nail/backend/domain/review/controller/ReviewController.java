package com.nail.backend.domain.review.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.nail.backend.domain.community.request.CommunityCommentRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.response.CommunityGetRes;
import com.nail.backend.domain.review.db.entity.Review;
import com.nail.backend.domain.review.db.entity.ReviewComment;
import com.nail.backend.domain.review.request.ReviewCommentModifyPutReq;
import com.nail.backend.domain.review.request.ReviewCommentRegisterPostReq;
import com.nail.backend.domain.review.request.ReviewRegisterPostReq;
import com.nail.backend.domain.review.response.ReviewGetRes;
import com.nail.backend.domain.review.service.ReviewService;
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
@Api(value = "리뷰 Api")
@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

//    CREATE_________________________________________
@Transactional
@ApiOperation(value = "리뷰 글 작성")
@ApiResponses({
        @ApiResponse(code = 201, message = "등록 성공"),
        @ApiResponse(code = 404, message = "등록 실패")
})
@PostMapping
public ResponseEntity<BaseResponseBody> reviewRegister(@RequestPart(value = "reviewFiles", required = false) List<MultipartFile> reviewFiles,
                                                          @ModelAttribute ReviewRegisterPostReq reviewRegisterPostReq,
                                                          Principal principal) throws IOException {
    System.out.println(reviewRegisterPostReq);
    log.info("reviewRegister - 호출");
//    String userId = principal.getName();
        String userId = "2217289220";

    Review res = reviewService.reviewRegister(reviewFiles, reviewRegisterPostReq, userId);
    if (!res.equals(null)) {
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
    } else {
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록실패"));
    }
}

    @Transactional
    @ApiOperation(value = "리뷰 글 댓글 작성",
            notes = "reivewCommentLayer\" -    1 : 원 댓글작성 , 3 : 대댓글 작성\n" +
                    "  \"reviewCommentSeq\"(원댓글Seq) : 대댓글 작성때만 넘겨주세요!,\n"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/comment")
    public ResponseEntity<BaseResponseBody> reviewCommentRegister(@RequestBody ReviewCommentRegisterPostReq reviewCommentRegisterPostReq,
                                                                     Principal principal) {

        log.info("reviewCommentRegister - 호출");
        String userId = principal.getName();
//        String userId = "2217289220";

        ReviewComment res = reviewService.reviewCommentRegister(reviewCommentRegisterPostReq, userId);
        if (!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록실패"));
        }
    }

//    READ___________________________________________
    @ApiOperation(value = "리뷰 글 전체조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 404, message = "조회 실패")
    })
    @GetMapping
    public ResponseEntity<Page<ReviewGetRes>> getReviewList(@PageableDefault(page = 0, size = 10, sort = "reviewSeq", direction = Sort.Direction.DESC) Pageable pageable) {

        log.info("getReviewList - 호출");
        Page<ReviewGetRes> reviewList = reviewService.getReviewList(pageable);

        return ResponseEntity.status(200).body(reviewList);
}

//    UPDATE_________________________________________

    @Transactional
    @ApiOperation(value ="리뷰 댓글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 성공"),
            @ApiResponse(code = 404, message = "수정 실패")
    })
    @PutMapping("/comment")
    public ResponseEntity<BaseResponseBody> reviewCommentUpdate(@RequestBody ReviewCommentModifyPutReq reviewCommentModifyPutReq){
        log.info("reviewCommentUpdate - 호출");

        if(reviewService.reviewCommentModify(reviewCommentModifyPutReq)== 0) {
            log.error("reviewCommentModify - This reviewCommentSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"수정 실패"));
        }
        else
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"수정 성공"));
    }


    //    DELETE_________________________________________
@Transactional
@ApiOperation(value = "리뷰 글 삭제")
@ApiResponses({
        @ApiResponse(code = 200, message = "삭제 성공"),
        @ApiResponse(code = 404, message = "삭제 실패")
})
@DeleteMapping("/{reviewSeq}")
public ResponseEntity<BaseResponseBody> reviewRemove(@ApiParam(value = "리뷰 글 번호") @PathVariable Long reviewSeq) {
    log.info("reviewRemove - 호출");

    if (reviewService.reviewRemove(reviewSeq)) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제성공"));
    } else {
        log.error("reviewRemove - This reviewSeq doesn't exist");
        return ResponseEntity.status(404).body(BaseResponseBody.of(404, "삭제실패"));
    }

}

    @Transactional
    @ApiOperation(value = "리뷰 댓글 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "삭제 실패")
    })
    @PatchMapping("review/{reviewCommentSeq}")
    public ResponseEntity<BaseResponseBody> reviewCommentRemove(@ApiParam(value = "리뷰 댓글 번호") @PathVariable Long reviewCommentSeq) {
        log.info("reviewCommentRemove - 호출");

        if (reviewService.reviewCommentRemove(reviewCommentSeq)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제성공"));
        } else {
            log.error("reviewCommentRemove - This reviewCommentSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "삭제실패"));
        }


    }

}
