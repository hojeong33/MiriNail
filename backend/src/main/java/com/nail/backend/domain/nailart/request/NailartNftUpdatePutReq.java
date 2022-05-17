package com.nail.backend.domain.nailart.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NailartNftUpdatePutReq {
    long nailartSeq;
    String nailartNft;
}
