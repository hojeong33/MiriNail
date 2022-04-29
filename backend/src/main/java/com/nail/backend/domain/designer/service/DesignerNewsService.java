package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import com.nail.backend.domain.designer.response.DesignerNewsListGetRes;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DesignerNewsService {
    List<DesignerNewsListGetRes> designerNewsList(long designerSeq, int page, int size);
    boolean designerNewsRemove(long designerNewsSeq);

    // 디자이너 뉴스 등록
    DesignerNews designerNewsRegister(DesignerNews designerNews, List<MultipartFile> files);
}
