package com.nail.backend.domain.desinger.service;

import com.nail.backend.domain.desinger.db.entitiy.DesignerNews;
import com.nail.backend.domain.desinger.db.entitiy.DesignerNews;
import org.springframework.data.domain.Page;

public interface DesignerNewsService {
    Page<DesignerNews> designerNewsList(long designerSeq, int page, int size);
    boolean desingerNewsRemove(long designerNewsSeq);
}
