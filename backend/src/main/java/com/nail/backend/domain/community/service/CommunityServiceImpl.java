package com.nail.backend.domain.community.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.db.entity.CommunityImg;
import com.nail.backend.domain.community.db.repository.CommunityCommentRepository;
import com.nail.backend.domain.community.db.repository.CommunityCommentRepositorySupport;
import com.nail.backend.domain.community.db.repository.CommunityImgRepository;
import com.nail.backend.domain.community.db.repository.CommunityRepository;
import com.nail.backend.domain.community.request.CommunityCommentRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.response.CommunityGetRes;
import com.nail.backend.domain.qna.response.QnaGetRes;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    CommunityImgRepository communityImgRepository;

    @Autowired
    CommunityCommentRepository communityCommentRepository;

    @Autowired
    CommunityCommentRepositorySupport communityCommentRepositorySupport;

    @Autowired
    UserRepository userRepository;

//    CREATE_________________________________________

    public Community communityRegister(List<MultipartFile> communityFiles,
                                       CommunityRegisterPostReq communityRegisterPostReq,
                                       String userId) throws IOException{

        User user = userRepository.findByUserId(userId);

        Community community = Community.builder()
                .user(user)
                .communityTitle(communityRegisterPostReq.getCommunityTitle())
                .communityDesc(communityRegisterPostReq.getCommunityDesc())
                .communityRegedAt(LocalDateTime.now())
                .build();

        Community saveCommunity = communityRepository.save(community);


        //파일 처리

        if(!communityFiles.isEmpty()){
            for (MultipartFile f : communityFiles ) {

                // file 업로드
                String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                //파일 객체 생성
        //        System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
                File file = new File(System.getProperty("user.dir")+ fileName);

                //파일 저장
                f.transferTo(file);

                //S3 파일 업로드
                awsS3Service.uploadOnS3(fileName, file);

                //주소 할당
                String communityFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                //파일 삭제
                file.delete();


                // 소통게시판 파일 테이블 insert


                CommunityImg communityImg = CommunityImg.builder()
                        .community(saveCommunity)
                        .communityImgUrl(communityFileUrl)
                        .build();

                communityImgRepository.save(communityImg);

            }

        }

        return saveCommunity;
    }

    public CommunityComment communityCommentRegister(CommunityCommentRegisterPostReq communityCommentRegisterPostReq,
                                                     String userId){
        Community community = communityRepository.findById(communityCommentRegisterPostReq.getCommunitySeq()).orElse(null);
        User user = userRepository.findByUserId(userId);

        if(communityCommentRegisterPostReq.getCommunityCommentLayer() == 1){
            // 댓글 작성 layer == 1 일 경우
        CommunityComment communityComment = CommunityComment.builder()
                .community(community)
                .user(user)
                .communityCommentDesc(communityCommentRegisterPostReq.getCommunityCommentDesc())
                .communityCommentLayer(communityCommentRegisterPostReq.getCommunityCommentLayer())
                .communityCommentRegedAt(LocalDateTime.now())
                .build();

        CommunityComment res = communityCommentRepository.save(communityComment);

        communityCommentRepositorySupport.setCommentGroup(res.getCommunityCommentSeq());
        return res;

        }else{
            // 대댓글 작성
            CommunityComment communityComment = CommunityComment.builder()
                    .community(community)
                    .user(user)
                    .communityCommentDesc(communityCommentRegisterPostReq.getCommunityCommentDesc())
                    .communityGroupNum(communityCommentRegisterPostReq.getCommunityCommentSeq())
                    .communityCommentLayer(communityCommentRegisterPostReq.getCommunityCommentLayer())
                    .communityCommentRegedAt(LocalDateTime.now())
                    .build();

            CommunityComment res = communityCommentRepository.save(communityComment);

            //원댓글에 대댓글 있다는표시 -  layer2로 변경
            if(communityCommentRepository.findById(communityCommentRegisterPostReq.getCommunityCommentSeq())
                    .get().getCommunityCommentLayer() == 1){
                communityCommentRepositorySupport.modifyCommentLayer(communityCommentRegisterPostReq.getCommunityCommentSeq());
            }
            return res;

        }

    }

//    READ___________________________________________

    public Page<CommunityGetRes> getCommunityList(Pageable pageable){
        Page<Community> communityList = communityRepository.findAll(pageable);
        List<CommunityGetRes> communityGetResList = new ArrayList<>();

        long total = communityList.getTotalElements();
        for (Community c : communityList) {
            CommunityGetRes communityGetRes =CommunityGetRes.builder()
                    .communitySeq(c.getCommunitySeq())
                    .userSeq(c.getUser().getUserSeq())
                    .userNickname(c.getUser().getUserNickname())
                    .userProfileImg(c.getUser().getUserProfileImg())
                    .communityTitle(c.getCommunityTitle())
                    .communityDesc(c.getCommunityDesc())
                    .communityCnt(c.getCommunityCnt())
                    .communityRegedAt(c.getCommunityRegedAt())
                    .communityImg(c.getCommunityImg())
                    .build();
            communityGetResList.add(communityGetRes);
        }
        Page<CommunityGetRes> res = new PageImpl<>(communityGetResList, pageable, total);


        return res;
    }
    public CommunityGetRes getCommunity(Long communitySeq){
        Community community = communityRepository.findById(communitySeq).orElse(null);

        CommunityGetRes res = CommunityGetRes.builder()
                .communitySeq(community.getCommunitySeq())
                .userSeq(community.getUser().getUserSeq())
                .userNickname(community.getUser().getUserNickname())
                .userProfileImg(community.getUser().getUserProfileImg())
                .communityTitle(community.getCommunityTitle())
                .communityDesc(community.getCommunityDesc())
                .communityCnt(community.getCommunityCnt())
                .communityRegedAt(community.getCommunityRegedAt())
                .communityImg(community.getCommunityImg())
                .build();
        return res;
    }


//    UPDATE_________________________________________

//    DELETE_________________________________________

    public boolean communityRemove(Long communitySeq){

        if(communityRepository.findById(communitySeq).isPresent()){
            communityRepository.deleteById(communitySeq);
             return true;
        }
        return false;

    }
}
