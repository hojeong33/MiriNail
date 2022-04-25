package com.nail.backend.domain.user.db.repository;

import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserEmail(String userEmail);
}
