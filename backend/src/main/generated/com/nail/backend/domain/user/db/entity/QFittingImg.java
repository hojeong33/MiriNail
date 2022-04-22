package com.nail.backend.domain.user.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFittingImg is a Querydsl query type for FittingImg
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFittingImg extends EntityPathBase<FittingImg> {

    private static final long serialVersionUID = 1415472957L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFittingImg fittingImg = new QFittingImg("fittingImg");

    public final NumberPath<Long> fittingImgSeq = createNumber("fittingImgSeq", Long.class);

    public final StringPath fittingImgUrl = createString("fittingImgUrl");

    public final QUser user;

    public QFittingImg(String variable) {
        this(FittingImg.class, forVariable(variable), INITS);
    }

    public QFittingImg(Path<? extends FittingImg> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFittingImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFittingImg(PathMetadata metadata, PathInits inits) {
        this(FittingImg.class, metadata, inits);
    }

    public QFittingImg(Class<? extends FittingImg> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

