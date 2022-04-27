package com.nail.backend.domain.book.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
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

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/calendar")
    @ApiOperation(value = "네일아트 예약 조회", notes = "<strong>네일아트 예약 조회한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<BookCheck> bookCheck(@RequestParam Long designerSeq,
                                               @RequestParam String bookDate) {

        log.info("bookCheck - 호출");
        BookCheck bookCheck = bookService.bookCheck(designerSeq, bookDate);

        return ResponseEntity.status(200).body(bookCheck);
    }

    @GetMapping("/user/{userSeq}")
    @ApiOperation(value = "유저 네일아트 예약 조회", notes = "<strong>유저 네일아트 예약 조회한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "해당 유저 예약 없음.")
    })
    public ResponseEntity<List<Book>> getBookListByUserSeq(@PathVariable("userSeq") Long userSeq) {

        log.info("getBookByUserSeq - 호출");
        List<Book> bookList = bookService.getBookLitByUserSeq(userSeq);

        if(bookList.isEmpty()) return ResponseEntity.status(404).body(null);
        return ResponseEntity.status(200).body(bookList);
    }

    @GetMapping("/designer/{designerSeq}")
    @ApiOperation(value = "디자이너 네일아트 예약 조회", notes = "<strong>디자이너 네일아트 예약 조회한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "해당 유저 예약 없음.")
    })
    public ResponseEntity<List<Book>> getBookListByDesignerSeq(@PathVariable("designerSeq") Long designerSeq) {

        log.info("getBookListByDesignerSeq - 호출");
        List<Book> bookList = bookService.getBookLitByDesignerSeq(designerSeq);

        if(bookList.isEmpty()) return ResponseEntity.status(404).body(null);
        return ResponseEntity.status(200).body(bookList);
    }

    @PostMapping
    @ApiOperation(value = "네일아트 예약 등록", notes = "<strong>네일아트 예약 등록한다.</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "실패.")
    })
    public ResponseEntity<BaseResponseBody> bookRegister(@RequestBody BookPostReq bookPostReq) {

        log.info("bookRegister - 호출");
        Book book = bookService.bookRegister(bookPostReq);

        if(book == null) {
            log.error("bookRegister - This book doesn't exist.");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "예약 등록 실패했습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "예약 등록 성공했습니다."));
    }
}
