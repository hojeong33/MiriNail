package com.nail.backend.domain.oauth.info.impl;

import com.nail.backend.domain.oauth.info.OAuth2UserInfo;

import java.util.Map;

public class KaKaoOAuth2UserInfo extends OAuth2UserInfo {
    public KaKaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    // 카카오에서의 id번호이기 때문에 우리 DB의 Seq과는 다름.
    @Override
    public Long getUserSeq() {
        return Long.parseLong(attributes.get("id").toString());
    }

    @Override
    public String getUserId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getUserNickname() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if(properties == null) {
            return null;

        }
        return (String) properties.get("nickname");
    }

    @Override
    public String getUserEmail() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("kakao_account");

        if(properties == null) {
            return null;

        }
        return (String) properties.get("email");
    }

    @Override
    public String getUserProfileImg() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if(properties == null) {
            return null;

        }
        return (String) properties.get("profile_image");
    }

    @Override
    public String getUserGender() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("kakao_account");

        if(properties == null) {
            return null;

        }
        return (String) properties.get("gender");
    }

    @Override
    public String getUserAgeRange() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("kakao_account");

        if(properties == null) {
            return null;

        }
        return (String) properties.get("age_range");
    }

}
