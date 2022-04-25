package com.nail.backend.domain.user.db.repository;

import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
    User findByUserSeq(long userSeq);
}
