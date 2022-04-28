package com.nail.backend.domain.designer.db.repository;

import com.nail.backend.domain.designer.db.entitiy.DesignerInfo;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignerInfoRepository extends JpaRepository<DesignerInfo, User> {
}
