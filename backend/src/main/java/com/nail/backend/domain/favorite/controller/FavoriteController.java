package com.nail.backend.domain.favorite.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.favorite.db.entity.Favorite;
import com.nail.backend.domain.favorite.service.FavoriteService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@Slf4j
@Api(value ="좋아요")
@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {

    @Autowired
    FavoriteService favoriteService;

    // Create
    @PostMapping("/{nailartSeq}")
    @ApiOperation(value = "상품 좋아요 추가")
    @ApiResponses({
            @ApiResponse(code = 201,message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> favoriteRegister (Principal principal,
                                                              @ApiParam(value = "네일아트 seq") @PathVariable("nailartSeq") Long nailartSeq){
        log.info("favoriteRegister - 호출");

        /**
         * 카카오 id 값이 토큰에 저장된다는 전제조건.
         */
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");         System.out.println(principal.getName());
        Favorite favorite = favoriteService.favoriteRegister(principal.getName(), nailartSeq);

        if(null != favorite){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"신청 성공"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }

    // Read
    // 1. 좋아요 했는지 여부
    // 2. 좋아요한 수
    // 3. 내가 좋아요한 상품 리스트 -> User에 있네??
    @GetMapping("/{nailartSeq}")
    @ApiOperation(value = "내가 좋아요한 여부")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "반환 성공"),
            @ApiResponse(code = 404 , message = "반환 실패")
    })
    public boolean getFavoriteUserUse ( Principal principal,
                                 @ApiParam(value = "네일아트 seq") @PathVariable("nailartSeq") Long nailartSeq){
        log.info("favoriteGet - 호출");
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");         System.out.println(principal.getName());
        if( favoriteService.getIsFavorited(principal.getName(), nailartSeq)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 네일아트 완성되면 구현가능
     * @param userSeq
     * @param pageable
     */
    @GetMapping("/nailart/{userSeq}")
    @ApiOperation(value = "내가 좋아요한 네일아트 리스트")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "반환 성공"),
            @ApiResponse(code = 404 , message = "반환 실패")
    })
    public void getFavoriteList (@ApiParam(value = "유저 seq") @PathVariable("userSeq") Long userSeq,
                                 @PageableDefault(page = 0, size = 10) Pageable pageable){
        log.info("getFavoriteList - 호출");
        Page<Favorite> favoriteList = favoriteService.getFavoriteListByUserSeq(userSeq, pageable);
//        Page<Nailart> nailartList = nailartService.getNailartListByUserSeq(userSeq, favoriteList);
//        return nailartList;
    }

    @GetMapping("/{nailartSeq}/count")
    @ApiOperation(value = "좋아요 수")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "반환 성공"),
            @ApiResponse(code = 404 , message = "반환 실패")
    })
    public Long getFavoriteCount (@ApiParam(value = "네일아트 seq") @PathVariable("nailartSeq") Long nailartSeq){
        log.info("getFavoriteCount - 호출");
        return favoriteService.getFavoriteCount(nailartSeq);
    }



    // Delete
    @DeleteMapping("/{nailartSeq}")
    @ApiOperation(value = "좋아요취소")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "취소 성공"),
            @ApiResponse(code = 404 , message = "취소 실패")
    })
    public ResponseEntity<BaseResponseBody> favoriteRemove(@ApiParam(value ="네일아트 seq") @PathVariable("nailartSeq") Long nailartSeq,
                                                           Principal principal){
        log.info("favoriteRemove - 호출");

        Favorite favorite = favoriteService.favoriteRemove(principal.getName(), nailartSeq);

        if(null != favorite){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"취소 성공"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "취소 실패"));
        }
    }


}