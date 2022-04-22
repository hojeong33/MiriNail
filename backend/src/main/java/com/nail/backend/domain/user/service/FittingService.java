package com.nail.backend.domain.user.service;

import com.nail.backend.domain.user.db.entity.FittingImg;

public interface FittingService {
    FittingImg findByUserSeq(Long userSeq);
}
