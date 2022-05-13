package com.nail.backend.domain.nailart.response;

import com.nail.backend.domain.nailart.db.entity.Nailart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignerNailartListRes {

    List<Nailart> nailart;

    int totalElements;
}
