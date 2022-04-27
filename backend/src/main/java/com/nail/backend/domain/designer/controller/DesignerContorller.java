package com.nail.backend.domain.designer.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import com.nail.backend.domain.designer.response.DesignerListConditionGetRes;
import com.nail.backend.domain.designer.response.DesignerInfoGetRes;
import com.nail.backend.domain.designer.response.DesignerNewsListGetRes;
import com.nail.backend.domain.designer.service.DesignerInfoService;
import com.nail.backend.domain.designer.service.DesignerNewsService;
import com.nail.backend.domain.designer.service.DesignerService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/designer")
public class DesignerContorller {

    @Autowired
    DesignerNewsService designerNewsService;

    @Autowired
    DesignerInfoService designerInfoService;

    @Autowired
    DesignerService designerService;

    @ApiOperation(value = "디자이너 정보 조회")
    @GetMapping("/profile/{designerSeq}")
    public DesignerInfoGetRes designerInfoGetRes (@PathVariable("designerSeq") long designerSeq){
        return designerInfoService.designerInfo(designerSeq);
    }

    @ApiOperation(value = "디자이너 news 조회")
    @GetMapping("/news")
    public List<DesignerNewsListGetRes> designerNewsListByDesignerSeq (@RequestParam long designerSeq, @RequestParam int page, @RequestParam int size){
        return designerNewsService.designerNewsList(designerSeq, page, size);
    }

    @ApiOperation(value = "디자이너 뉴스 작성")
    @PostMapping(value = "/news", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<BaseResponseBody> designerNewsRegister(@RequestParam("jsonList") String jsonList, @RequestPart("files") List<MultipartFile> files) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper().registerModule(new SimpleModule());
        DesignerNews designerNews = objectMapper.readValue(jsonList, new TypeReference<DesignerNews>() {});
        designerNewsService.designerNewsRegister(designerNews, files);
        return new ResponseEntity<BaseResponseBody>(HttpStatus.OK);
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

    // 디자이너 조건별 조회
    // 1. 팔로워 수
    @GetMapping("/list/countFollower")
    public List<DesignerListConditionGetRes> deisgnerListCountFollower(){
        return designerService.getDesignerListbyFollowCount();
    }
    // 2. 최신등록 순
    @GetMapping("/list/latest")
    public List<DesignerListConditionGetRes> designerListLatest(){
        return designerService.getDesignerListbylatest();
    }
    // 3. 리뷰 점수 높은 순
    // 4. 디자이너 전체 조회
    @GetMapping("/list/all")
    public List<DesignerListConditionGetRes> designerListAll(int page, int size){
        return designerService.getDesignerListbylatest();
    }

}
