package com.nail.backend.domain.book.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("BookLIstByDesignerSeqGetRes")
public class BookLIstByDesignerSeqGetRes {

    // 예약이 있는 날짜
    LocalDate bookDate;
}
