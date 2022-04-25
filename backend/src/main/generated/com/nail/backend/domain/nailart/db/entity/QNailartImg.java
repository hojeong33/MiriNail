package com.nail.backend.domain.nailart.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNailartImg is a Querydsl query type for NailartImg
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNailartImg extends EntityPathBase<NailartImg> {

    private static final long serialVersionUID = 2042819543L;

    public static final QNailartImg nailartImg = new QNailartImg("nailartImg");

    public final NumberPath<Long> nailartImgSeq = createNumber("nailartImgSeq", Long.class);

    public final StringPath nailartImgUrl = createString("nailartImgUrl");

    public final NumberPath<Long> nailartSeq = createNumber("nailartSeq", Long.class);

    public QNailartImg(String variable) {
        super(NailartImg.class, forVariable(variable));
    }

    public QNailartImg(Path<? extends NailartImg> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNailartImg(PathMetadata metadata) {
        super(NailartImg.class, metadata);
    }

}

