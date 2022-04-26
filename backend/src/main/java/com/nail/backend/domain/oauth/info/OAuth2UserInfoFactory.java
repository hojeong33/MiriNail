package com.nail.backend.domain.oauth.info;

import com.nail.backend.domain.oauth.info.impl.KaKaoOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(Map<String, Object> attributes) {
        return new KaKaoOAuth2UserInfo(attributes);
    }
}
