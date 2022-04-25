package com.nail.backend.domain.authentication.db.repository;

import com.nail.backend.domain.authentication.db.entity.DesignerApplication;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignerApplicationRepository extends JpaRepository<DesignerApplication, User> {
}
