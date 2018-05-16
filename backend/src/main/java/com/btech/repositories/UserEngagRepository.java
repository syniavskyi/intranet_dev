package com.btech.repositories;

import com.btech.model.UserEngag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserEngagRepository extends JpaRepository<UserEngag, Long> {

    List<UserEngag> findByUserId(Long id);
    Optional<UserEngag> findById(Long id);
}
