package com.nail.backend.domain.user.service;


import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogServiceImpl implements LogService{

    @Autowired
    private LogRepository logRepository;

    @Override
    public User getUserDetailByEmail(String userEmail) {
        Optional<User> user = logRepository.findUserByUserEmail(userEmail);

        if(user.isPresent()) {  // 이미 한번 로그인한 유저라면
            return user.get();
        } else {    // 처음 로그인한 유저라면
            User newUser = User.builder()   // 유저 정보 빌드
                    .userNickname("noname") // 닉네임 초기 설정
                    .userRole("ROLE_USER") // 유저 역할 초기 설정 (일반 유저)
                    .build();

            User nowOldUser = logRepository.save(newUser); // db에 유저 정보 저장

            return nowOldUser;
        }
    }

    @Override
    public User getUserDetailById(long userSeq) {
        Optional<User> user = logRepository.findById(userSeq);
        if(user.isPresent()) {  // 이미 한번 로그인한 유저라면
            return user.get();
        } else {    // 처음 로그인한 유저라면
            return null;
        }
    }
}
