package com.nail.backend.domain.nailart.service;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import com.nail.backend.domain.nailart.db.entity.NailartImg;
import com.nail.backend.domain.nailart.db.repository.NailartRepository;
import com.nail.backend.domain.nailart.request.NailartRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class NailartServiceImpl implements NailartService{

    @Autowired
    NailartRepository nailartRepository;

    @Override
    public Page<Nailart> nailartList(int page, int size) {
        PageRequest pageReuest = PageRequest.of(page - 1, size, Sort.by("nailartSeq").descending());
        Page<Nailart> nailart = nailartRepository.findAll(pageReuest);
        return nailart;
    }

    @Override
    public Nailart nailartDetail(long nailartSeq) {
        // 만약 해당 작가의 다른 작품도 같이 보여주려면 여기다가 다른 객체를 생성해서 반환?
        // 아니면 각각 다른 곳에서 호춯하고 controller에서 합치기?
        return nailartRepository.findById(nailartSeq).get();
    }



    @Override
    public Nailart nailartRegister(NailartRegisterPostReq nailartRegisterPostReq, List<MultipartFile> multipartFiles) {
        Nailart nailart = new Nailart();
        NailartImg nailartImg = new NailartImg();
        // 먼저 생성된 작품 번호를 받아와야 한다.
        // 받아온 작품 번호를 외래키로 지정.

        for (int i = 0; i < multipartFiles.size(); i++) {
            if(i == 0){
                nailart.setNailartName(nailartRegisterPostReq.getNailartName());
                nailart.setNailartDesc(nailartRegisterPostReq.getNailartDesc());
                nailart.setNailartType(nailartRegisterPostReq.getNailartType());
                nailart.setNailartColor(nailartRegisterPostReq.getNailartColor());
                nailart.setNailartDetailColor(nailartRegisterPostReq.getNailartDetailColor());
                nailart.setNailartWeather(nailartRegisterPostReq.getNailartWeather());
                nailart.setNailartPrice(nailartRegisterPostReq.getNailartPrice());
                nailart.setNailartThumbnailUrl();
                nailartRepository.save(nailart);

            }else{
                nailartImg.setNailartSeq("작품 번호");
                nailartImg.setNailartImgUrl("이미지 url");
            }
        }

        return null;
    }

    @Override
    public boolean nailartRemove(long nailartSeq) {
        if (nailartRepository.findById(nailartSeq).isPresent()){
            nailartRepository.deleteById(nailartSeq);
            return true;
        } else return false;
    }


}
