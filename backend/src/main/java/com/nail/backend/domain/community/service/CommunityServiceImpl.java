package com.nail.backend.domain.community.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.service.AwsS3Service;
import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.db.entity.CommunityComment;
import com.nail.backend.domain.community.db.entity.CommunityImg;
import com.nail.backend.domain.community.db.repository.*;
import com.nail.backend.domain.community.request.CommunityCommentModifyPutReq;
import com.nail.backend.domain.community.request.CommunityCommentRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityRegisterPostReq;
import com.nail.backend.domain.community.request.CommunityUpdatePostReq;
import com.nail.backend.domain.community.response.CommunityCommentGetRes;
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

import javax.transaction.Transactional;
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
    CommunityRepositorySupport communityRepositorySupport;

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
                .communityCnt(0L)
                .communityRegedAt(LocalDateTime.now())
                .build();

        Community saveCommunity = communityRepository.save(community);


        //?????? ??????

        if(!communityFiles.isEmpty()){
            for (MultipartFile f : communityFiles ) {

                // file ?????????
                String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                //?????? ?????? ??????
        //        System.getProperty => ????????? ????????? ?????? ????????? ?????? ??? ??????. (user.dir = ?????? ?????? ??????????????? ?????????)
                File file = new File(System.getProperty("user.dir")+ fileName);

                //?????? ??????
                f.transferTo(file);

                //S3 ?????? ?????????
                awsS3Service.uploadOnS3(fileName, file);

                //?????? ??????
                String communityFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                //?????? ??????
                file.delete();


                // ??????????????? ?????? ????????? insert


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
            // ?????? ?????? layer == 1 ??? ??????
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
            // ????????? ??????
            CommunityComment communityComment = CommunityComment.builder()
                    .community(community)
                    .user(user)
                    .communityCommentDesc(communityCommentRegisterPostReq.getCommunityCommentDesc())
                    .communityGroupNum(communityCommentRegisterPostReq.getCommunityCommentSeq())
                    .communityCommentLayer(communityCommentRegisterPostReq.getCommunityCommentLayer())
                    .communityCommentRegedAt(LocalDateTime.now())
                    .build();

            CommunityComment res = communityCommentRepository.save(communityComment);

            //???????????? ????????? ??????????????? -  layer2??? ??????
            if(communityCommentRepository.findById(communityCommentRegisterPostReq.getCommunityCommentSeq())
                    .get().getCommunityCommentLayer() == 1){
                communityCommentRepositorySupport.modifyCommentLayer(communityCommentRegisterPostReq.getCommunityCommentSeq());
            }
            return res;

        }

    }

//    READ___________________________________________
    // ????????????
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
    // ?????? ??? ??? ??????
    public Page<CommunityGetRes> getCommunityListByUser(Pageable pageable, String userId){
        User user = userRepository.findByUserId(userId);
        Page<Community> communityList = communityRepository.findAllByUser(pageable, user);
        List<CommunityGetRes> communityGetResList = new ArrayList<>();

        long total = communityList.getTotalElements();
        for (Community c : communityList) {
            CommunityGetRes communityGetRes =CommunityGetRes.builder()
                    .userSeq(c.getUser().getUserSeq())
                    .userProfileImg(c.getUser().getUserProfileImg())
                    .userNickname(c.getUser().getUserNickname())
                    .communitySeq(c.getCommunitySeq())
                    .communityTitle(c.getCommunityTitle())
                    .communityCnt(c.getCommunityCnt())
                    .communityRegedAt(c.getCommunityRegedAt())
                    .communityImg(c.getCommunityImg())
                    .build();
            communityGetResList.add(communityGetRes);
        }
        Page<CommunityGetRes> res = new PageImpl<>(communityGetResList, pageable, total);

        return res;
    }

    public List<CommunityGetRes> getTop20Community(){
        List<Community> communityList = communityRepository.findTop20ByOrderByCommunityCntDesc();

        List<CommunityGetRes> communityGetResList = new ArrayList<>();

        for (Community c : communityList) {
            CommunityGetRes communityGetRes =CommunityGetRes.builder()
                    .userSeq(c.getUser().getUserSeq())
                    .userProfileImg(c.getUser().getUserProfileImg())
                    .userNickname(c.getUser().getUserNickname())
                    .communitySeq(c.getCommunitySeq())
                    .communityTitle(c.getCommunityTitle())
                    .communityCnt(c.getCommunityCnt())
                    .communityRegedAt(c.getCommunityRegedAt())
                    .communityImg(c.getCommunityImg())
                    .build();
            communityGetResList.add(communityGetRes);
        }


        return communityGetResList;
    }



    // ????????????
    public CommunityGetRes getCommunity(Long communitySeq){
        Community community = communityRepository.findById(communitySeq).orElse(null);



        // ???????????? ?????????
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

        communityRepositorySupport.modifyCommunityCnt(community.getCommunityCnt(),communitySeq);
        return res;
    }

    // ?????? ----------------------------
    public Page<CommunityCommentGetRes> getCommunityComment(Pageable pageable, Long communitySeq){

        Page<CommunityComment> communityComments = communityCommentRepository.findAllByCommunity_CommunitySeqAndCommunityCommentLayerIsNot
                        (pageable, communitySeq,3);

        Long total = communityComments.getTotalElements();
        List<CommunityCommentGetRes> resCommentList  = new ArrayList<>();

        for (CommunityComment comments :communityComments) {

            // ??????
            List<CommunityComment> communityCommentLayer = communityCommentRepository.findAllByCommunityGroupNumAndCommunityCommentLayer
                    (comments.getCommunityCommentSeq(),3);

            CommunityCommentGetRes comment = CommunityCommentGetRes.builder()
                    .communityCommentSeq(comments.getCommunityCommentSeq())
                    .communityCommentIsDelete(comments.isCommunityCommentIsDelete())
                    .userSeq(comments.getUser().getUserSeq())
                    .userNickname(comments.getUser().getUserNickname())
                    .userProfileImg(comments.getUser().getUserProfileImg())
                    .communityCommentDesc(comments.getCommunityCommentDesc())
                    .communityGroupNum(comments.getCommunityGroupNum())
                    .communityCommentLayer(comments.getCommunityCommentLayer())
                    .communityCommentRegedAt(comments.getCommunityCommentRegedAt())
                    .communityCommentLayerExist(!communityCommentLayer.isEmpty())
                    .communityCommentLayerCnt(communityCommentLayer.size())
                    .build();

            resCommentList.add(comment);
        }
        Page<CommunityCommentGetRes> res = new PageImpl<>(resCommentList, pageable, total);

        return res;
    }

    public Page<CommunityCommentGetRes> getCommunityCommentLayer(Pageable pageable, Long communityCommentSeq){
        Page<CommunityComment> communityComments = communityCommentRepository.findAllByCommunityGroupNumAndCommunityCommentLayer
                (pageable, communityCommentSeq,3);

        Long total = communityComments.getTotalElements();
        List<CommunityCommentGetRes> resCommentList  = new ArrayList<>();

        for (CommunityComment comments :communityComments) {

            CommunityCommentGetRes comment = CommunityCommentGetRes.builder()
                    .communityCommentSeq(comments.getCommunityCommentSeq())
                    .communityCommentIsDelete(comments.isCommunityCommentIsDelete())
                    .userSeq(comments.getUser().getUserSeq())
                    .userNickname(comments.getUser().getUserNickname())
                    .userProfileImg(comments.getUser().getUserProfileImg())
                    .communityCommentDesc(comments.getCommunityCommentDesc())
                    .communityGroupNum(comments.getCommunityGroupNum())
                    .communityCommentLayer(comments.getCommunityCommentLayer())
                    .communityCommentRegedAt(comments.getCommunityCommentRegedAt())
                    .build();

            resCommentList.add(comment);
        }
        Page<CommunityCommentGetRes> res = new PageImpl<>(resCommentList, pageable, total);

        return res;
    }



//    UPDATE_________________________________________

    public Community communityUpdate(List<MultipartFile> communityFiles,
                                       CommunityUpdatePostReq communityUpdatePostReq,
                                       String userId) throws IOException{

        Community community = communityRepository.findById(communityUpdatePostReq.getCommunitySeq()).orElse(null);
        if(community.getUser().getUserId().equals(userId)){

            communityRepositorySupport.modifyCommunity(communityUpdatePostReq);
            community = communityRepository.findById(communityUpdatePostReq.getCommunitySeq()).orElse(null);
        //?????? ??????

            // ?????? url ??????
            communityImgRepository.deleteAllByCommunity_CommunitySeq(communityUpdatePostReq.getCommunitySeq());

            // ?????? ?????????
            if(!communityFiles.isEmpty()){
                for (MultipartFile f : communityFiles ) {

                    // file ?????????
                    String fileName  = awsS3Service.createFileName(f.getOriginalFilename());

                    //?????? ?????? ??????
                    //        System.getProperty => ????????? ????????? ?????? ????????? ?????? ??? ??????. (user.dir = ?????? ?????? ??????????????? ?????????)
                    File file = new File(System.getProperty("user.dir")+ fileName);

                    //?????? ??????
                    f.transferTo(file);

                    //S3 ?????? ?????????
                    awsS3Service.uploadOnS3(fileName, file);

                    //?????? ??????
                    String communityFileUrl = amazonS3Client.getUrl(bucket,fileName).toString();

                    //?????? ??????
                    file.delete();


                    // ??????????????? ?????? ????????? insert
                    CommunityImg communityImg = CommunityImg.builder()
                            .community(community)
                            .communityImgUrl(communityFileUrl)
                            .build();

                    communityImgRepository.save(communityImg);

                }
            }
        }

        return community;
    }
    @Override
    @Transactional
    public Long communityCommentModify(CommunityCommentModifyPutReq communityCommentModifyPutReq){

        //?????? ????????? ???????????? ??????, ???????????? ????????? 0 ??????
        if(communityCommentRepository.findById(communityCommentModifyPutReq.getCommunityCommentSeq()).isPresent()){
            Long execute = communityCommentRepositorySupport.updateCommunityCommentByCommentSeq(communityCommentModifyPutReq);
            return execute;
        }
        else return 0L;

    }


//    DELETE_________________________________________

    public boolean communityRemove(Long communitySeq){

        if(communityRepository.findById(communitySeq).isPresent()){
//            communityImgRepository.deleteCommunityImgByCommunity_CommunitySeq(communitySeq);
            communityRepository.deleteById(communitySeq);
             return true;
        }
        return false;

    }

    public boolean communityCommentRemove(Long communitySeq){

        communityCommentRepositorySupport.deleteCommunityComment(communitySeq);

        return true;

    }
}
