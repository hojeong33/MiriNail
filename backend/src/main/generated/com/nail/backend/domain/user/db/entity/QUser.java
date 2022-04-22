package com.nail.backend.domain.user.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1382927100L;

    public static final QUser user = new QUser("user");

    public final StringPath userAgeRange = createString("userAgeRange");

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userGender = createString("userGender");

    public final StringPath userId = createString("userId");

    public final StringPath userNickname = createString("userNickname");

    public final StringPath userProfileImg = createString("userProfileImg");

    public final DateTimePath<java.time.LocalDateTime> userRegedAt = createDateTime("userRegedAt", java.time.LocalDateTime.class);

    public final StringPath userRole = createString("userRole");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public final StringPath userTel = createString("userTel");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

