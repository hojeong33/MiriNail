package com.nail.backend.domain.desinger.db.entitiy;

import com.nail.backend.domain.user.db.entity.User;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "designer_info")
public class DesignerInfo implements Serializable {

    @Id
    @OneToOne
    @JoinColumn(name = "designer_seq", updatable = false, insertable = false)
    private User user;


}
