package com.nail.backend.domain.book.response;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("BookListByUserSeqGetRes")
public class BookListByUserSeqGetRes {

    // 해당 예약 정보
    List<Book> bookList;

    // 방문 횟수
    int visitCount;

    // 해당 디자이너 별 횟수
    List<Designer> designerList;

    @Getter
    @Setter
    public class Designer {
        DesignerInfo designerInfo;
        int designerCount;
    }
}

