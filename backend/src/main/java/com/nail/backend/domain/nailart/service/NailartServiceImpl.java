package com.nail.backend.domain.nailart.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nail.backend.domain.designer.db.repository.DesignerRepository;
import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.entity.NailartImg;
import com.nail.backend.domain.nailart.db.repository.NailartImgRepository;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import com.nail.backend.domain.nailart.response.NailartDetailGetRes;
import com.nail.backend.domain.nailart.response.NailartListGetRes;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.google.common.io.Files.getFileExtension;

@RequiredArgsConstructor

@Service
@Component
public class NailartServiceImpl implements NailartService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    @Autowired
    NailartRepository nailartRepository;

    @Autowired
    NailartImgRepository nailartImgRepository;

    @Autowired
    DesignerRepository designerRepository;

    @Autowired
    UserRepository userRepository;

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
    public List<NailartListGetRes> nailartList(int page, int size) {
        List<NailartListGetRes> nailart = new ArrayList<>();
        PageRequest pageReuest = PageRequest.of(page - 1, size, Sort.by("nailartSeq").descending());
        nailartRepository.findAll(pageReuest).forEach(art -> {
            NailartListGetRes tmp = new NailartListGetRes();

            tmp.setNailartSeq(art.getNailartSeq());

            tmp.setDesignerNickname(userRepository.findByUserSeq(art.getDesignerSeq()).getUserNickname());
            tmp.setDesignerSeq(art.getDesignerSeq());
            tmp.setTokenId(art.getTokenId());
            tmp.setNailartName(art.getNailartName());
            tmp.setNailartDesc(art.getNailartDesc());
            tmp.setNailartColor(art.getNailartColor());
            tmp.setNailartDetailColor(art.getNailartDetailColor());
            tmp.setNailartWeather(art.getNailartWeather());
            tmp.setNailartThumbnailUrl(art.getNailartThumbnailUrl());

            tmp.setNailartType(art.getNailartType());
//            tmp.setNailartAvailable(art.get);

            // tmp.setNailartAvailable(art.get);

            tmp.setNailartPrice(art.getNailartPrice());
            tmp.setNailartRegedAt(art.getNailartRegedAt());
            tmp.setNailartRating(art.getNailartRating());
            nailart.add(tmp);
        });

        return nailart;
    }

    @Override
    public List<NailartListGetRes> anotherNailart(long designerSeq) {
        List<NailartListGetRes> nailartList = new ArrayList<>();
        List<Nailart> nailart = nailartRepository.findAllByDesignerSeq(designerSeq);
        int count = 0;
        for (Nailart art: nailart) {
            if(count > 9) break;
            NailartListGetRes tmp = new NailartListGetRes();
            tmp.setNailartSeq(art.getNailartSeq());
            tmp.setDesignerNickname(userRepository.findByUserSeq(art.getDesignerSeq()).getUserNickname());
            tmp.setDesignerSeq(art.getDesignerSeq());
            tmp.setTokenId(art.getTokenId());
            tmp.setNailartName(art.getNailartName());
            tmp.setNailartDesc(art.getNailartDesc());
            tmp.setNailartColor(art.getNailartColor());
            tmp.setNailartDetailColor(art.getNailartDetailColor());
            tmp.setNailartWeather(art.getNailartWeather());
            tmp.setNailartThumbnailUrl(art.getNailartThumbnailUrl());
            tmp.setNailartType(art.getNailartType());
//            tmp.setNailartAvailable(art.get);
            tmp.setNailartPrice(art.getNailartPrice());
            tmp.setNailartRegedAt(art.getNailartRegedAt());
            tmp.setNailartRating(art.getNailartRating());
            nailartList.add(tmp);
            count ++;
        }
        return nailartList;
    }

    @Override
    public NailartDetailGetRes nailartDetail(long nailartSeq) {
        // 만약 해당 작가의 다른 작품도 같이 보여주려면 여기다가 다른 객체를 생성해서 반환?
        // 아니면 각각 다른 곳에서 호춯하고 controller에서 합치기?\
        NailartDetailGetRes nailartDetailGetRes = new NailartDetailGetRes();
        Nailart nailart = nailartRepository.findByNailartSeq(nailartSeq);
        nailartDetailGetRes.setNailartSeq(nailart.getNailartSeq());
        nailartDetailGetRes
                .setDesignerNickname(userRepository.findByUserSeq(nailart.getDesignerSeq()).getUserNickname());
        nailartDetailGetRes.setDesignerSeq(nailart.getDesignerSeq());
        nailartDetailGetRes.setNailartName(nailart.getNailartName());
        nailartDetailGetRes.setNailartDesc(nailart.getNailartDesc());
        nailartDetailGetRes.setNailartType(nailart.getNailartType());
        nailartDetailGetRes.setNailartColor(nailart.getNailartColor());
        nailartDetailGetRes.setNailartDetailColor(nailart.getNailartDetailColor());
        nailartDetailGetRes.setNailartWeather(nailart.getNailartWeather());
        nailartDetailGetRes.setNailartAvailable(nailart.isNailartAvailable());
        nailartDetailGetRes.setNailartThumbnailUrl(nailart.getNailartThumbnailUrl());
        nailartDetailGetRes.setNailartPrice(nailart.getNailartPrice());
        nailartDetailGetRes.setNailartRegedAt(nailart.getNailartRegedAt());
        nailartDetailGetRes.setNailartRating(nailart.getNailartRating());
        nailartDetailGetRes.setNailartImgUrl(nailartImgRepository.findByNailartSeq(nailartSeq).getNailartImgUrl());

        return nailartDetailGetRes;
    }


    @Override
    public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> files) {
        Nailart nailart = new Nailart();
        NailartImg nailartImg = new NailartImg();
        Nailart nailartSaved = new Nailart();
        // 먼저 생성된 작품 번호를 받아와야 한다.
        // 받아온 작품 번호를 외래키로 지정.

        System.out.println("등록으로 들어왔다.");
        System.out.println(nailartRegisterPostReq);
        System.out.println(files);
        int index = 0;
        for (MultipartFile file : files) {
            System.out.println("q반복문체크");
            if (index == 0) {
                System.out.println("들어온건가?");
                // System.out.println(files);
                nailart.setDesignerSeq(nailartRegisterPostReq.getDesignerSeq());
                nailart.setNailartName(nailartRegisterPostReq.getNailartName());
                nailart.setNailartDesc(nailartRegisterPostReq.getNailartDesc());
                nailart.setNailartType(nailartRegisterPostReq.getNailartType());
                nailart.setNailartColor(nailartRegisterPostReq.getNailartColor());
                nailart.setNailartDetailColor(nailartRegisterPostReq.getNailartDetailColor());
                nailart.setNailartWeather(nailartRegisterPostReq.getNailartWeather());
                nailart.setNailartPrice(nailartRegisterPostReq.getNailartPrice());
                // 이미지 업로드
                String fileName = createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());
                System.out.println(nailart);
                System.out.println(fileName);
                try (InputStream inputStream = file.getInputStream()) {
                    System.out.println("s3 진입");
                    System.out.println("bucket :  " + bucket);
                    System.out.println("fileName : " + fileName);
                    System.out.println("inputStream : " + file.getInputStream());
                    System.out.println("objectMetadata : " + objectMetadata);
                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
                    System.out.println("s3문제인듯?");
                } catch (IOException e) {
                    System.out.println("s3 진입 실패");
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
                }
                //
                System.out.println("과연여기까지?");
                nailart.setNailartThumbnailUrl(amazonS3.getUrl(bucket, fileName).toString());
                System.out.println(nailart);
                nailartSaved = nailartRepository.save(nailart);
            } else {
                // 이미지 업로드
                String fileName = createFileName(file.getOriginalFilename());
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());
                System.out.println("두번째파일");
                try (InputStream inputStream = file.getInputStream()) {
                    System.out.println("두번째파일 s3 진입");
                    amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead));
                } catch (IOException e) {
                    System.out.println("두번째파일 s3 진입 실패");
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
                }
                //
                nailartImg.setNailartSeq(nailartSaved.getNailartSeq());
                nailartImg.setNailartImgUrl(amazonS3.getUrl(bucket, fileName).toString());

                System.out.println(nailartImg);
                nailartImgRepository.save(nailartImg);
            }
            index++;
        }
        System.out.println("여기까지안오나?");
        System.out.println(nailart);
        return nailart;
    }
    // @Override
    // public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq,
    // List<MultipartFile> multipartFiles) {
    // Nailart nailart = new Nailart();
    // NailartImg nailartImg = new NailartImg();
    // Nailart nailartSaved = new Nailart();
    // // 먼저 생성된 작품 번호를 받아와야 한다.
    // // 받아온 작품 번호를 외래키로 지정.
    //
    // System.out.println("등록으로 들어왔다.");
    //
    // int index = 0;
    // for(MultipartFile file: multipartFiles) {
    // if(index == 0){
    // nailart.setNailartName(nailartRegisterPostReq.getNailartName());
    // nailart.setNailartDesc(nailartRegisterPostReq.getNailartDesc());
    // nailart.setNailartType(nailartRegisterPostReq.getNailartType());
    // nailart.setNailartColor(nailartRegisterPostReq.getNailartColor());
    // nailart.setNailartDetailColor(nailartRegisterPostReq.getNailartDetailColor());
    // nailart.setNailartWeather(nailartRegisterPostReq.getNailartWeather());
    // nailart.setNailartPrice(nailartRegisterPostReq.getNailartPrice());
    // // 이미지 업로드
    // String fileName = createFileName(file.getOriginalFilename());
    // ObjectMetadata objectMetadata = new ObjectMetadata();
    // objectMetadata.setContentLength(file.getSize());
    // objectMetadata.setContentType(file.getContentType());
    //
    // try(InputStream inputStream = file.getInputStream()) {
    // amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream,
    // objectMetadata)
    // .withCannedAcl(CannedAccessControlList.PublicRead));
    // } catch(IOException e) {
    // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에
    // 실패했습니다.");
    // }
    // //
    // nailart.setNailartThumbnailUrl(fileName);
    // nailartSaved = nailartRepository.save(nailart);
    // }else{
    // // 이미지 업로드
    // String fileName = createFileName(file.getOriginalFilename());
    // ObjectMetadata objectMetadata = new ObjectMetadata();
    // objectMetadata.setContentLength(file.getSize());
    // objectMetadata.setContentType(file.getContentType());
    //
    // try(InputStream inputStream = file.getInputStream()) {
    // amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream,
    // objectMetadata)
    // .withCannedAcl(CannedAccessControlList.PublicRead));
    // } catch(IOException e) {
    // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에
    // 실패했습니다.");
    // }
    // //
    // nailartImg.setNailartSeq(nailartSaved.getNailartSeq());
    // nailartImg.setNailartImgUrl(fileName);
    // }
    // index++;
    // }
    //
    // return nailart;
    // }

    @Override
    public boolean nailartRemove(long nailartSeq) {
        if (nailartRepository.findById(nailartSeq).isPresent()) {
            nailartRepository.deleteById(nailartSeq);
            return true;
        } else
            return false;
    }

}
