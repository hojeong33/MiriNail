package com.nail.backend.domain.community.service;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.nail.backend.domain.community.request.CommunityCommentRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.response.CommunityCommentGetRes;
import com.nail.backend.domain.community.response.CommunityGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CommunityService {

//    CREATE___________________________________________
    Community communityRegister(List<MultipartFile> communityFiles, CommunityRegisterPostReq communityRegisterPostReq,String userId) throws IOException;
    CommunityComment communityCommentRegister(CommunityCommentRegisterPostReq communityCommentRegisterPostReq,String userId);

//    READ___________________________________________
    Page<CommunityGetRes> getCommunityList(Pageable pageable);
    CommunityGetRes getCommunity(Long communitySeq);
    // 댓글
    Page<CommunityCommentGetRes> getCommunityComment(Pageable pageable, Long communitySeq);
    // 대댓글
    Page<CommunityCommentGetRes> getCommunityCommentLayer(Pageable pageable, Long communityCommentSeq);




//    UPDATE_________________________________________
    Long communityCommentModify(CommunityCommentModifyPutReq communityCommentModifyPutReq);

//    DELETE_________________________________________
    boolean communityRemove(Long communitySeq);
    boolean communityCommentRemove(Long communityCommentSeq);
}
