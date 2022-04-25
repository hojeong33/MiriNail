package com.nail.backend.domain.nailart.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QNailart is a Querydsl query type for Nailart
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNailart extends EntityPathBase<Nailart> {

    private static final long serialVersionUID = 333822028L;

    public static final QNailart nailart = new QNailart("nailart");

    public final NumberPath<Long> designerSeq = createNumber("designerSeq", Long.class);

    public final BooleanPath nailartAvailable = createBoolean("nailartAvailable");

    public final StringPath nailartColor = createString("nailartColor");

    public final StringPath nailartDesc = createString("nailartDesc");

    public final StringPath nailartDetailColor = createString("nailartDetailColor");

    public final StringPath nailartName = createString("nailartName");

    public final NumberPath<Integer> nailartPrice = createNumber("nailartPrice", Integer.class);

    public final NumberPath<Float> nailartRating = createNumber("nailartRating", Float.class);

    public final DateTimePath<java.sql.Timestamp> nailartRegedAt = createDateTime("nailartRegedAt", java.sql.Timestamp.class);

    public final NumberPath<Long> nailartSeq = createNumber("nailartSeq", Long.class);

    public final StringPath nailartThumbnailUrl = createString("nailartThumbnailUrl");

    public final StringPath nailartType = createString("nailartType");

    public final StringPath nailartWeather = createString("nailartWeather");

    public final NumberPath<Long> tokenId = createNumber("tokenId", Long.class);

    public QNailart(String variable) {
        super(Nailart.class, forVariable(variable));
    }

    public QNailart(Path<? extends Nailart> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNailart(PathMetadata metadata) {
        super(Nailart.class, metadata);
    }

}

