package com.nail.backend.domain.desinger.db.entitiy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDesignerInfo is a Querydsl query type for DesignerInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDesignerInfo extends EntityPathBase<DesignerInfo> {

    private static final long serialVersionUID = 1761084677L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDesignerInfo designerInfo = new QDesignerInfo("designerInfo");

    public final NumberPath<Long> designerSeq = createNumber("designerSeq", Long.class);

    public final com.nail.backend.domain.user.db.entity.QUser user;

    public QDesignerInfo(String variable) {
        this(DesignerInfo.class, forVariable(variable), INITS);
    }

    public QDesignerInfo(Path<? extends DesignerInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDesignerInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDesignerInfo(PathMetadata metadata, PathInits inits) {
        this(DesignerInfo.class, metadata, inits);
    }

    public QDesignerInfo(Class<? extends DesignerInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.nail.backend.domain.user.db.entity.QUser(forProperty("user")) : null;
    }

}

