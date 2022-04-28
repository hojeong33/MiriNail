package com.nail.backend.domain.community.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityImg;
import com.nail.backend.domain.community.db.repository.CommunityImgRepository;
import com.nail.backend.domain.community.db.repository.CommunityRepository;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
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


//    CREATE_________________________________________

    public Community communityRegister(List<MultipartFile> communityFiles,
                                       CommunityRegisterPostReq communityRegisterPostReq,
                                       Long userSeq) throws IOException{

        Community community = Community.builder()
                .userSeq(userSeq)
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

//    READ___________________________________________

    public Page<Community> getCommunity(Pageable pageable){
        Page<Community> communityList = communityRepository.findAll(pageable);

        return communityList;
    }


//    UPDATE_________________________________________

//    DELETE_________________________________________

}
