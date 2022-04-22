package com.nail.backend.domain.nailart.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNailart is a Querydsl query type for Nailart
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNailart extends EntityPathBase<Nailart> {

    private static final long serialVersionUID = 333822028L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNailart nailart = new QNailart("nailart");

    public final com.nail.backend.domain.desinger.db.entitiy.QDesignerInfo designerInfo;

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
        this(Nailart.class, forVariable(variable), INITS);
    }

    public QNailart(Path<? extends Nailart> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNailart(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNailart(PathMetadata metadata, PathInits inits) {
        this(Nailart.class, metadata, inits);
    }

    public QNailart(Class<? extends Nailart> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.designerInfo = inits.isInitialized("designerInfo") ? new com.nail.backend.domain.desinger.db.entitiy.QDesignerInfo(forProperty("designerInfo"), inits.get("designerInfo")) : null;
    }

}

