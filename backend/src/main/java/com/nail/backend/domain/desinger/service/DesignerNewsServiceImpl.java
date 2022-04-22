package com.nail.backend.domain.desinger.service;

import com.nail.backend.domain.desinger.db.entitiy.DesignerNews;
import com.nail.backend.domain.desinger.db.repository.DesignerNewsRepository;
import com.nail.backend.domain.desinger.db.entitiy.DesignerNews;
import com.nail.backend.domain.desinger.db.repository.DesignerNewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DesignerNewsServiceImpl implements DesignerNewsService{

    @Autowired
    DesignerNewsRepository designerNewsRepository;

    @Override
    public Page<DesignerNews> designerNewsList(long designerSeq, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("designerNewsSeq").descending());
        Page<DesignerNews> news = designerNewsRepository.findAllByDesignerSeq(designerSeq, pageRequest);
        return news;
    }

    @Override
    public boolean desingerNewsRemove(long designerNewsSeq) {
        if(designerNewsRepository.findById(designerNewsSeq).isPresent()) {
            designerNewsRepository.deleteById(designerNewsSeq);
            return true;
        } else return false;
    }
}
