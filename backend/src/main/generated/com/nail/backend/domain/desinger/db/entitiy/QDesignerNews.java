package com.nail.backend.domain.desinger.db.entitiy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QDesignerNews is a Querydsl query type for DesignerNews
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDesignerNews extends EntityPathBase<DesignerNews> {

    private static final long serialVersionUID = 1761225514L;

    public static final QDesignerNews designerNews = new QDesignerNews("designerNews");

    public final StringPath designerNewsDesc = createString("designerNewsDesc");

    public final StringPath designerNewsImgUrl = createString("designerNewsImgUrl");

    public final DateTimePath<java.sql.Timestamp> designerNewsRegedAt = createDateTime("designerNewsRegedAt", java.sql.Timestamp.class);

    public final NumberPath<Long> designerNewsSeq = createNumber("designerNewsSeq", Long.class);

    public final StringPath designerNewsTitle = createString("designerNewsTitle");

    public final NumberPath<Long> designerSeq = createNumber("designerSeq", Long.class);

    public QDesignerNews(String variable) {
        super(DesignerNews.class, forVariable(variable));
    }

    public QDesignerNews(Path<? extends DesignerNews> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDesignerNews(PathMetadata metadata) {
        super(DesignerNews.class, metadata);
    }

}

