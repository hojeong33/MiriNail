package com.nail.backend.domain.user.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserRefreshToken is a Querydsl query type for UserRefreshToken
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserRefreshToken extends EntityPathBase<UserRefreshToken> {

    private static final long serialVersionUID = -1016861950L;

    public static final QUserRefreshToken userRefreshToken = new QUserRefreshToken("userRefreshToken");

    public final StringPath refreshToken = createString("refreshToken");

    public final NumberPath<Long> refreshTokenSeq = createNumber("refreshTokenSeq", Long.class);

    public final StringPath userId = createString("userId");

    public QUserRefreshToken(String variable) {
        super(UserRefreshToken.class, forVariable(variable));
    }

    public QUserRefreshToken(Path<? extends UserRefreshToken> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserRefreshToken(PathMetadata metadata) {
        super(UserRefreshToken.class, metadata);
    }

}

