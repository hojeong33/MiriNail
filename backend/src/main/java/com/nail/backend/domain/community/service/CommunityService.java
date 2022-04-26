package com.nail.backend.domain.community.service;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CommunityService {

    Community communityRegister(List<MultipartFile> communityFiles, CommunityRegisterPostReq communityRegisterPostReq,Long userSeq) throws IOException;
}
