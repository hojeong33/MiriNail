package com.nail.backend.domain.authentication.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.authentication.db.repository.DesignerApplicationRepository;
import com.nail.backend.domain.authentication.db.repository.DesignerApplicationRepositorySupport;
import com.nail.backend.domain.authentication.request.ArtistRegisterPostReq;
import com.nail.backend.domain.authentication.request.UpdateDesignerApplicationPatchReq;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service("AuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    DesignerApplicationRepository designerApplicationRepository;

    @Autowired
    DesignerApplicationRepositorySupport designerApplicationRepositorySupport;

    @Autowired
    UserRepository userRepository;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AwsS3Service awsS3Service;

    @Override
    public DesignerApplication artistRegister(ArtistRegisterPostReq artistRegisterPostReq,
            MultipartFile registrationFile, MultipartFile portfolioFile, String userId) throws IOException {

        // 사업자 등록증 파일 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String fileName = awsS3Service.createFileName(registrationFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        // 파일 저장
        registrationFile.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);
        // 주소 할당
        String registrationFileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 파일 삭제
        file.delete();


        // 포트폴리오 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String portfoliFileName = awsS3Service.createFileName(portfolioFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file2 = new File(System.getProperty("user.dir") + portfoliFileName);

        // 파일 저장
        portfolioFile.transferTo(file2);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(portfoliFileName, file2);
        // 주소 할당
        String portfolioUrl = amazonS3Client.getUrl(bucket, portfoliFileName).toString();

        // 파일 삭제
        file2.delete();

        User user = userRepository.findByUserId(userId);
        DesignerApplication designerApplication = DesignerApplication.builder()
                .designerSeq(user.getUserSeq())
                .designerCertification(registrationFileUrl)
                .designerPortfolio(portfolioUrl)
                .designerShopName(artistRegisterPostReq.getDesignerShopName())
                .designerAddress(artistRegisterPostReq.getDesignerAddress())
                .designerAuthStatus(true)
                .designerRegedAt(LocalDateTime.now())
                .build();

        DesignerApplication savedDesignerApplication = designerApplicationRepository.save(designerApplication);
        return savedDesignerApplication;
    }

    @Override
    public Page<DesignerApplication> getDesignerApplicationList(Pageable pageable) {
        Page<DesignerApplication> designerApplications = designerApplicationRepositorySupport.findDesignerApplicationList(pageable);
        return designerApplications;
    }

    @Override
    public DesignerApplication getDesignerApplicationDetail(Long designerSeq) {
        DesignerApplication designerApplication = designerApplicationRepository.findByDesignerSeq(designerSeq);
        return designerApplication;
    }

    @Override
    public DesignerApplication getDesignerApplicationStatus(Long designerSeq) {
        DesignerApplication designerApplication = designerApplicationRepository.findByDesignerSeq(designerSeq);
        return designerApplication;
    }

    @Override
    @Transactional
    public boolean deleteDesignerApplicationDetailByUserSeq(Long DesignerSeq) {
        boolean isDeleted = designerApplicationRepositorySupport.deleteByDesignerSeq(DesignerSeq);
        return isDeleted;
    }

    @Override
    public boolean updateDesignerApplication(UpdateDesignerApplicationPatchReq updateDesignerApplicationPatchReq) {
        boolean isAccepted = designerApplicationRepositorySupport.updateDesignerApplication(updateDesignerApplicationPatchReq);
        return isAccepted;
    }
}
