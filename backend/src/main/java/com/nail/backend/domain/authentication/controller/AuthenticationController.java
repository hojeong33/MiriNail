package com.nail.backend.domain.authentication.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.authentication.request.ArtistRegisterPostReq;
import com.nail.backend.domain.authentication.request.UpdateDesignerApplicationPatchReq;
import com.nail.backend.domain.authentication.service.AuthenticationService;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;

@Slf4j
@Api(value = "인증관리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/authentication")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    private final AwsS3Service awsS3Service;

    @Transactional
    @ApiOperation(value = "디자이너 인증 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping
    public ResponseEntity<BaseResponseBody> artistRegister(@ModelAttribute ArtistRegisterPostReq artistRegisterPostReq,
                                                               @RequestPart(value = "registrationFile") MultipartFile registrationFile,
                                                               Principal principal) throws IOException {

        // 디자이너 정보는 artistRegisterPostReq에, 사업자 등록증은 productFile, 포트폴리오는 portfolioFile에 담아온다.
        // 등록 정보를 DesignerApplication 테이블에 저장한다.
        // 저장 결과 성공적이면 201, 중간에 다른 정보들이 없으면 404

        log.info("artistRegister - 호출");
        DesignerApplication designerApplication = authenticationService.artistRegister(artistRegisterPostReq,registrationFile,principal.getName());
        if(!designerApplication.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 실패"));
        }
    }

    @GetMapping("/download/file")
    @ApiOperation(value = "인증 파일 다운로드", notes = "<strong>인증 파일 다운로드</strong>")
    public ResponseEntity<byte[]> authenticationFileDownload(@RequestParam String authUrl) throws IOException{
        log.info("authenticationFileDownload - 호출");

        return awsS3Service.downloadOnS3(authUrl);
    }

    /**
     인증신청 전체 정보 조회
     */
    @GetMapping("/list")
    @ApiOperation(value = "인증 등록 전체 정보 조회", notes = "<strong>인증 등록 전체 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<Page<DesignerApplication>>getDesignerApplicationList(@PageableDefault(page = 0, size = 10) Pageable pageable) {

        log.info("getDesignerApplicationList - 호출");
        Page<DesignerApplication> applications = authenticationService.getDesignerApplicationList(pageable);

        if(applications == null) {
            log.error("getDesignerApplicationList - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(applications);
    }

    /**
     인증신청 상세 정보 조회
     */
    @GetMapping("/detail/{designerSeq}")
    @ApiOperation(value = "인증 등록 상세 정보 조회", notes = "<strong>인증 등록 상세 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<DesignerApplication>getDesignerApplicationDetail(@PathVariable("designerSeq") Long designerSeq) {

        log.info("getDesignerApplicationDetail - 호출");
        DesignerApplication applications = authenticationService.getDesignerApplicationDetail(designerSeq);

        if(applications == null) {
            log.error("getDesignerApplicationDetail - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(applications);
    }

    /**
     인증신청 진행상황 조회
     */
    @GetMapping("/{designerSeq}")
    @ApiOperation(value = "인증 등록 상세 정보 조회", notes = "<strong>인증 등록 상세 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<DesignerApplication>getDesignerApplicationStatus(@PathVariable("designerSeq") Long designerSeq) {

         log.info("getDesignerApplicationStatus - 호출");
        DesignerApplication applications = authenticationService.getDesignerApplicationStatus(designerSeq);

        if(applications == null) {
            log.error("getDesignerApplicationStatus - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(applications);
    }

    /**
     유저가 작성한 디자이너 인증 신청 조회
     */
    @GetMapping("/user/{userSeq}")
    @ApiOperation(value = "유저가 작성한 디자이너 인증 신청 조회", notes = "<strong>유저가 작성한 디자이너 인증 신청 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<DesignerApplication>getDesignerApplicationDetailByUserSeq(@PathVariable("userSeq") Long userSeq) {

        log.info("getDesignerApplicationDetailByUserSeq - 호출");
        DesignerApplication applications = authenticationService.getDesignerApplicationDetail(userSeq);

        if(applications == null) {
            log.error("getDesignerApplicationDetailByUserSeq - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(applications);
    }

    @DeleteMapping("/user/{userSeq}")
    @ApiOperation(value = "유저가 작성한 디자이너 인증 신청 삭제", notes = "<strong>유저가 작성한 디자이너 인증 신청 삭제</strong>.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "삭제 성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "삭제 실패.")
    })
    public ResponseEntity<BaseResponseBody>deleteDesignerApplicationDetailByUserSeq(@PathVariable("userSeq") Long userSeq) {

        log.info("deleteDesignerApplicationDetailByUserSeq - 호출");
        boolean isDeleted = authenticationService.deleteDesignerApplicationDetailByUserSeq(userSeq);

        if(!isDeleted) {
            log.error("deleteDesignerApplicationDetailByUserSeq - User doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "삭제 실패"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "삭제 성공"));
    }

    @PatchMapping("/confirm")
    @ApiOperation(value = "인증 수락 거절", notes = "<strong>인증 수락 거절</strong>.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "인증 처리 성공", response = DesignerApplication.class),
            @ApiResponse(code = 404, message = "인증 처리 실패.")
    })
    public ResponseEntity<BaseResponseBody> updateDesignerApplication(@RequestBody UpdateDesignerApplicationPatchReq updateDesignerApplicationPatchReq) {

        log.info("updateDesignerApplication - 호출");
        boolean isDeleted = authenticationService.updateDesignerApplication(updateDesignerApplicationPatchReq);

        if(!isDeleted) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "인증 거절"));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "인증 성공"));
    }
}
