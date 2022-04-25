package com.nail.backend.domain.nailart.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="nailart_img")
public class NailartImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long nailartImgSeq;

    // join 해야함
    private long nailartSeq;

    private String nailartImgUrl;
}
