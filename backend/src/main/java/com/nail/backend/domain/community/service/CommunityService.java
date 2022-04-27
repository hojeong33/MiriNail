package com.nail.backend.domain.community.service;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CommunityService {

//    CREATE___________________________________________
    Community communityRegister(List<MultipartFile> communityFiles, CommunityRegisterPostReq communityRegisterPostReq,Long userSeq) throws IOException;

//    READ___________________________________________
    Page<Community> getCommunity(Pageable pageable);




//    UPDATE_________________________________________

//    DELETE_________________________________________
}
