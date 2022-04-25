package com.nail.backend.domain.nailart.service;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.response.NailartDetailGetRes;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NailartService {
    // 네일 아트 리스트 전체 조회
    List<NailartListGetRes> nailartList(int limit, int offset);

    // 네일 아트 상세 조회
    NailartDetailGetRes nailartDetail(long nailartSeq);

    // 네일 아트 등록
    Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> files);

    // 네일 아트 수정

    // 네일 아트 삭제
    boolean nailartRemove(long nailartSeq);


}
