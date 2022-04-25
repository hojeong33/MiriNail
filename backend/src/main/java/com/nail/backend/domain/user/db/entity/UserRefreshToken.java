package com.nail.backend.domain.user.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_REFRESH_TOKEN")
public class UserRefreshToken {
    @JsonIgnore
    @Id
    @Column(name = "REFRESH_TOKEN_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    private String userId;

    @Column(name = "REFRESH_TOKEN", length = 256)
    @NotNull
    private String refreshToken;

    public UserRefreshToken(
            @NotNull String userId,
            @NotNull String refreshToken
    ) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}

