package com.nail.backend.domain.community.db.repository;

import com.nail.backend.domain.community.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {

}
