package com.nail.backend.domain.oauth.info;

import java.util.Map;

public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract Long getUserSeq();

    public abstract String getUserId();

    public abstract String getUserNickname();

    public abstract String getUserEmail();

    public abstract String getUserProfileImg();

    public abstract String getUserGender();

    public abstract String getUserAgeRange();

}
