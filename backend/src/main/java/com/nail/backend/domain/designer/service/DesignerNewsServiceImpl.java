package com.nail.backend.domain.designer.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import com.nail.backend.domain.designer.db.entitiy.DesignerNewsImg;
import com.nail.backend.domain.designer.db.repository.DesignerNewsImgRepository;
import com.nail.backend.domain.designer.db.repository.DesignerNewsRepository;
import com.nail.backend.domain.designer.response.DesignerNewsListGetRes;
import com.nail.backend.domain.follow.db.repository.FollowRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@Component
public class DesignerNewsServiceImpl implements DesignerNewsService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

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

    @Autowired
    DesignerNewsRepository designerNewsRepository;

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Autowired
    DesignerNewsImgRepository designerNewsImgRepository;

    public DesignerNewsServiceImpl(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    @Override
    public List<DesignerNewsListGetRes> designerNewsList(long designerSeq, int page, int size) {
        List<DesignerNewsListGetRes> result = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("designerNewsSeq").descending());
        Page<DesignerNews> tmp = designerNewsRepository.findAllByDesignerSeq(designerSeq, pageRequest);
        List<DesignerNews> news = tmp.getContent();
        for (DesignerNews article: news) {
            DesignerNewsListGetRes res = new DesignerNewsListGetRes();
            res.setDesignerNewsSeq(article.getDesignerNewsSeq());
            res.setDesignerSeq(article.getDesignerSeq());
            res.setDesignerNewsTitle(article.getDesignerNewsTitle());
            res.setDesignerNewsDesc(article.getDesignerNewsDesc());
            res.setDesignerNewsRegedAt(article.getDesignerNewsRegedAt());
            res.setDesignerNewsImgUrl(designerNewsImgRepository.findAllByDesignerNewsSeq(article.getDesignerNewsSeq()));
            result.add(res);
        }

//        Page<DesignerNewsListGetRes> news = designerNewsRepository.findAllByDesignerSeq(designerSeq, pageRequest);
        return result;
    }

    @Override
    public boolean designerNewsRemove(long designerNewsSeq) {
        if(designerNewsRepository.findById(designerNewsSeq).isPresent()) {
            designerNewsRepository.deleteById(designerNewsSeq);
            return true;
        } else return false;
    }

    @Override
    public DesignerNews designerNewsRegister(DesignerNews designerNews, List<MultipartFile> files) {
        DesignerNews news = new DesignerNews();
        designerNews.setDesignerNewsRegedAt(Timestamp.valueOf(LocalDateTime.now()));
        news = designerNewsRepository.save(designerNews);

        for (MultipartFile file: files) {
            DesignerNewsImg newsImg = new DesignerNewsImg();
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
            }
            newsImg.setDesignerNewsSeq(news.getDesignerNewsSeq());
            newsImg.setDesignerNewsImgUrl(amazonS3.getUrl(bucket, fileName).toString());
            designerNewsImgRepository.save(newsImg);
        }

        return news;
    }
}
