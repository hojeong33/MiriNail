package com.nail.backend.domain.user.controller;


import com.nail.backend.domain.user.db.entity.FittingImg;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import com.nail.backend.domain.user.response.ApiResponse;
import com.nail.backend.domain.user.service.FittingService;
import com.nail.backend.domain.user.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final FittingService fittingService;

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }

    @GetMapping("/{userSeq}")
    @ApiOperation(value = "유저 정보 조회", notes = "<strong>UserId에 해당하는 유저의 정보</strong>을 넘겨준다.")
    @ApiResponses({
            @io.swagger.annotations.ApiResponse(code = 201, message = "성공", response = User.class),
            @io.swagger.annotations.ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<User> getUserDetailByUserId(@PathVariable("userSeq") Long userSeq) {

        // 0. 받아올 유저 Seq를 받음
        // 1. 해당 하는 유저에 대한 정보를 넘겨준다.

        log.info("getUserDetailByUserId - 호출");
        User user = userRepository.findByUserSeq(userSeq);
        if(null == user) {
            log.error("getUserDetailByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(user);
    }

    @GetMapping("/fitting/{userSeq}")
    @ApiOperation(value = "유저 피팅 이미지 정보 조회", notes = "<strong>UserId에 해당하는 유저의 피팅 이미지 정보</strong>을 넘겨준다.")
    @ApiResponses({
            @io.swagger.annotations.ApiResponse(code = 201, message = "성공", response = User.class),
            @io.swagger.annotations.ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<FittingImg> getUserFittingImgByUserId(@PathVariable("userSeq") Long userSeq) {

        // 0. 받아올 유저 Seq를 받음
        // 1. 해당 하는 유저에 대한 정보를 넘겨준다.

        log.info("getUserFittingImgByUserId - 호출");
        User user = userRepository.findByUserSeq(userSeq);
        FittingImg fittingImg = fittingService.findByUserSeq(user.getUserSeq());
        if(null == user) {
            log.error("getUserFittingImgByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(fittingImg);
    }
}

