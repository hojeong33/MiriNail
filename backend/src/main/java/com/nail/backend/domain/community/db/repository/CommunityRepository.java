package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.Community;
import com.nail.backend.domain.community.response.CommunityGetRes;
import com.nail.backend.domain.user.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {
    Page<Community> findAllByUser(Pageable pageable, User user);

    List<Community> findTop20ByOrderByCommunityCntDesc();
}
