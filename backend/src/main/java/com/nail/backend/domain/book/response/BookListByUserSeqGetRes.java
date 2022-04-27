package com.nail.backend.domain.book.response;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("BookListByUserSeqGetRes")
public class BookListByUserSeqGetRes {

    // 해당 예약 정보
    List<Book> bookList;

    // 총 방문 횟수
    Long visitCount;

    // 해당 디자이너 별 횟수
    List<Designer> designerList;

    @Getter
    @Setter
    public static class Designer {
        DesignerInfo designerInfo;
        Long designerCount;
    }
}

