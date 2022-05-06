package com.nail.backend.domain.designer.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepository;
import com.nail.backend.domain.designer.db.repository.DesignerInfoRepositorySupport;
import com.nail.backend.domain.designer.db.repository.DesignerRepository;
import com.nail.backend.domain.designer.db.repository.DesignerRepositorySupport;
import com.nail.backend.domain.designer.response.DesignerInfoGetRes;
import com.nail.backend.domain.follow.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class DesignerInfoServiceImpl implements DesignerInfoService{

    @Autowired
    DesignerRepository designerRepository;

    @Autowired
    DesignerInfoRepository designerInfoRepository;

    @Autowired
    DesignerRepositorySupport designerRepositorySupport;

    @Autowired
    DesignerInfoRepositorySupport designerInfoRepositorySupport;

    @Autowired
    FollowService followService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public DesignerInfoServiceImpl(AmazonS3 amazonS3) { this.amazonS3 = amazonS3; }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    @Override
    public DesignerInfoGetRes designerInfo(long designerSeq) {

        DesignerInfoGetRes designerInfoGetRes = new DesignerInfoGetRes();
        designerInfoGetRes.setDesignerInfo(designerRepository.findByDesignerSeq(designerSeq));
        designerInfoGetRes.setFollower(followService.getFollowerList(designerSeq));
        return designerInfoGetRes;
    }

    @Override
    public boolean designerProfileImgUrlupdate(long designerSeq, MultipartFile file) {
        if(designerInfoRepository.findByDesignerSeq(designerSeq).getDesignerSeq() != null){
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
            }
            designerRepositorySupport.DesignerProfileUpdate(designerSeq, amazonS3.getUrl(bucket, fileName).toString());
            return true;
        }else return false;
    }

    @Override
    public boolean designerIntroduceRegister(DesignerInfo designerInfo, MultipartFile file) {
        if(designerInfoRepository.findByDesignerSeq(designerInfo.getDesignerSeq()).getDesignerSeq() != null){
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
            }
            designerInfoRepositorySupport.DesignerInfoIntroduceUpdate(designerInfo, amazonS3.getUrl(bucket, fileName).toString());
            return true;
        }else return false;
    }

}
