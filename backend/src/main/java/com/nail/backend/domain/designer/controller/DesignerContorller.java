package com.nail.backend.domain.designer.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import com.nail.backend.domain.designer.request.DesignerNewsRegisterPostReq;
import com.nail.backend.domain.designer.service.DesignerNewsService;
import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/designer")
public class DesignerContorller {

    @Autowired
    DesignerNewsService designerNewsService;

    @ApiOperation(value = "디자이너 news 조회")
    @GetMapping("/news/{designerSeq}")
    public Page<DesignerNews> designerNewsListByDesignerSeq (@PathVariable("designerSeq") long designerSeq, @RequestParam int page, @RequestParam int size){
        return designerNewsService.designerNewsList(designerSeq, page, size);
    }

    @ApiOperation(value = "디자이너 뉴스 작성")
    @PostMapping("/news")
    public DesignerNews designerNewsRegister(@RequestBody DesignerNewsRegisterPostReq designerNewsRegisterPostReq, @RequestPart(value = "filename") MultipartFile multipartFile){
        return null;
    }

    @ApiOperation(value = "디자이너 뉴스 삭제")
    @DeleteMapping("/news/{designerNewsSeq}")
    public ResponseEntity<BaseResponseBody> designerNewsRemove (@PathVariable long designerNewsSeq){
        if(designerNewsService.designerNewsRemove(designerNewsSeq)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This designerNewsSeq doesn't exist."));
        }
    }

    // 이름 ,매장, 팔로워 수, 작품 개수

}
