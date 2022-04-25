package com.nail.backend.domain.user.service;

import com.nail.backend.domain.user.db.entity.FittingImg;
import com.nail.backend.domain.user.db.repository.FittingRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FittingServiceImpl implements FittingService{

    @Autowired
    FittingRepositorySupport fittingRepositorySupport;

    @Override
    public FittingImg findByUserSeq(Long userSeq) {
        FittingImg fittingImg = fittingRepositorySupport.findByUserSeq(userSeq).get();
        return fittingImg;
    }
}
