package com.nail.backend.domain.desinger.db.entitiy;

import com.nail.backend.domain.user.db.entity.User;
import lombok.Data;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "designer_info")
//@IdClass(DesignerInfoId.class)
public class DesignerInfo implements Serializable {

//    @Id
//    @OneToOne
//    @JoinColumn(name = "designer_seq", referencedColumnName = "user_seq")
//    private User user;
    @Id
    @Column(name = "designer_seq")
    private Long designerSeq;

    @OneToOne
    @MapsId
    @Setter
    @JoinColumn(name = "designer_seq")
    private User user;



}
