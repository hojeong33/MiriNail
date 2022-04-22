package com.nail.backend.domain.oauth.service;

import com.nail.backend.domain.oauth.entity.RoleType;
import com.nail.backend.domain.oauth.entity.UserPrincipal;
import com.nail.backend.domain.oauth.exception.OAuthProviderMissMatchException;
import com.nail.backend.domain.oauth.info.OAuth2UserInfo;
import com.nail.backend.domain.oauth.info.OAuth2UserInfoFactory;
import com.nail.backend.domain.user.db.entity.User;
import com.nail.backend.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(user.getAttributes());
        User savedUser = userRepository.findByUserId(userInfo.getUserId());

        if (savedUser != null) {
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo) {
        User user = User.builder()
                .userId(userInfo.getUserId())
                .userProfileImg(userInfo.getUserProfileImg())
                .userNickname(userInfo.getUserNickname())
                .userEmail(userInfo.getUserEmail())
                .userGender(userInfo.getUserGender())
                .userAgeRange(userInfo.getUserAgeRange())
                .userRegedAt(LocalDateTime.now())
                .userRole("ROLE_USER")
                .build();

        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getUserNickname() != null && !user.getUserNickname().equals(userInfo.getUserNickname())) {
            user.setUserNickname(userInfo.getUserNickname());
        }

        if (userInfo.getUserProfileImg() != null && !user.getUserProfileImg().equals(userInfo.getUserProfileImg())) {
            user.setUserProfileImg(userInfo.getUserProfileImg());
        }

        userRepository.save(user);
        return user;
    }
}

