package com.nail.backend.domain.follow.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.follow.db.entity.Follow;
import com.nail.backend.domain.follow.service.FollowService;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@Api(value = "팔로우 관리 API")
@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    FollowService followService;

    @GetMapping("/follower/{userSeq}")
    @ApiOperation(value = "팔로우 조회", notes = "<strong>팔로우 조회</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팔로우 조회 성공"),
            @ApiResponse(code = 404, message = "팔로우 조회 실패")
    })
    public ResponseEntity<List<DesignerInfo>> getFollowerList(@PathVariable(value = "userSeq") Long userSeq,
                                                              @PageableDefault(size = 10, page = 0) Pageable pageable){

        // 0. 토큰으로부터 내 userId를 받아온다.
        // 1. Follower가 입력받은 userId인 값들을 받아온다.

        log.info("getFollowerList - 호출");

        List<DesignerInfo> follow = followService.getFolloweeList(userSeq);

        if(null != follow) {
            return ResponseEntity.status(201).body(follow);
        }
        else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/followee/{userSeq}")
    @ApiOperation(value = "팔로워 조회", notes = "<strong>팔로워 조회</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팔로우 조회 성공"),
            @ApiResponse(code = 404, message = "팔로우 조회 실패")
    })
    public ResponseEntity<List<User>> getFolloweeList(@PathVariable(value = "userSeq") Long userSeq,
                                                      @PageableDefault(size = 10, page = 0) Pageable pageable){

        // 0. 토큰으로부터 내 userId를 받아온다.
        // 1. Followee가 입력받은 userId인 값들을 받아온다.

        log.info("getFolloweeList - 호출");

        List<User> follow = followService.getFollowerList(userSeq);

        if(null != follow) {
            return ResponseEntity.status(201).body(follow);
        }
        else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 신청", notes = "<strong>팔로우 신청</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> followRegister(@PathVariable(value = "followFollowee") Long followeeId,
                                                           Principal principal){

        // 0. 토큰으로부터 내 userId와 팔로우 신청할 유저의 Id(followeeId)를 받아온다.
        // 1. Follow 테이블에 추가.

        log.info("FollowRegister - 호출");

//        Long userId = Long.valueOf(principal.getName());
        Follow follow = followService.followRegister(followeeId,principal.getName());

        if(null != follow) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "신청 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }

    @DeleteMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 취소", notes = "<strong>팔로우 취소</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "취소 성공"),
            @ApiResponse(code = 404, message = "취소 실패")
    })
    public ResponseEntity<BaseResponseBody> followRemove(@PathVariable(value = "followFollowee") Long followeeId,
                                                         Principal principal){

        // 0. 토큰으로부터 내 userId와 팔로우 신청할 유저의 Id(followeeId)를 받아온다.
        // 1. Follow 테이블에서 삭제.
        log.info("followRemove - 호출");
//        Long userId = Long.valueOf(principal.getName());
        Follow follow = followService.followRemove(followeeId,principal.getName());

        if(null != follow) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "취소 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "취소 실패"));
        }
    }
}
