package com.nail.backend.domain.designer.service;

import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import com.nail.backend.domain.designer.db.entitiy.DesignerNews;
import org.springframework.data.domain.Page;

public interface DesignerNewsService {
    Page<DesignerNews> designerNewsList(long designerSeq, int page, int size);
    boolean designerNewsRemove(long designerNewsSeq);
}
