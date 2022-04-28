package com.nail.backend.domain.designer.response;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.user.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DesignerInfoGetRes {
    DesignerInfo designerInfo;
    List<User> follower;
}
