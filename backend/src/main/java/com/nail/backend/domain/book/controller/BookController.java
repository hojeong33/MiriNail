package com.nail.backend.domain.book.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.request.BookPostReq;
import com.nail.backend.domain.book.service.BookService;
import com.nail.backend.domain.user.db.entity.FittingImg;
import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;

    @PostMapping
    @ApiOperation(value = "네일아트 예약 등록", notes = "<strong>네일아트 예약 등록한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<BaseResponseBody> bookRegister(@RequestBody BookPostReq bookPostReq) {

        // 0. 받아올 유저 Seq를 받음
        // 1. 해당 하는 유저에 대한 정보를 넘겨준다.

        log.info("bookRegister - 호출");
        Book book = null;
        if(null == book) {
            log.error("bookRegister - This userId doesn't exist.");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "예약 등록 실패했습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "예약 등록 성공했습니다."));
    }
}
