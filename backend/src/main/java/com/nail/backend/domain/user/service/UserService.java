package com.nail.backend.domain.user.service;

import com.nail.backend.domain.user.db.entity.User;

public interface UserService {
    public User getUser(String userId);
}
