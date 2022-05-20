package com.nail.backend.domain.user.db.entity;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String nickname;
    private String email;
    private String picture;
    private String gender;
    private String ageRange;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String nickname,
                           String email, String picture, String gender, String ageRange) {
        this.attributes = attributes;
        this.nameAttributeKey= nameAttributeKey;
        this.nickname = nickname;
        this.email = email;
        this.picture = picture;
        this.gender = gender;
        this.ageRange = ageRange;
    }

    // OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값 하나하나를 변환해야 한다.
    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {
            return ofKaKao(userNameAttributeName, attributes);
    }


    private static OAuthAttributes ofKaKao(String userNameAttributeName,Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        System.out.println(attributes);
        System.out.println(profile.get("nickname"));
        System.out.println(kakaoAccount.get("email"));
        System.out.println(profile.get("profile_image_url"));

        return OAuthAttributes.builder()
                .nickname((String) profile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .gender((String) kakaoAccount.get("gender"))
                .ageRange((String) kakaoAccount.get("age_range"))
                .picture((String) profile.get("profile_image_url"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    // 엔티티 생성하는 시점은 처음 가입할 때
    public User toEntity() {
//        this.nickname = nickname;

        return User.builder()
                .userNickname(nickname)
                .userEmail(email)
                .userProfileImg(picture)
                .userRole("ROLE_USER")
                .userAgeRange(ageRange)
                .userGender(gender)
                .build();
    }
}
