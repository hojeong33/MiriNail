package com.nail.backend.domain.user.service;


import com.nail.backend.domain.user.db.entity.User;

public interface LogService {
    User getUserDetailByEmail(String userAddress);
    User getUserDetailById(long userId);
}
