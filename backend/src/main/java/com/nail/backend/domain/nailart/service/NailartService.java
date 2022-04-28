package com.nail.backend.domain.nailart.service;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.response.NailartDetailGetRes;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface NailartService {
    // 네일 아트 리스트 전체 조회
    List<NailartListGetRes> nailartList(int limit, int offset);

    // 디자이너의 다른 작품 조회( 10개 )
    List<NailartListGetRes> anotherNailart(long designerSeq);

    // 디자이너의 작품 조회
    Page<Nailart> getdesignerNailartList(long designerSeq, int page, int size);

    // 네일 아트 상세 조회
    NailartDetailGetRes nailartDetail(long nailartSeq);

    // 네일 아트 등록
    Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> files);

    // 네일 아트 수정

    // 네일 아트 삭제
    boolean nailartRemove(long nailartSeq);


}