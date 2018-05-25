package com.btech.repositories;

import com.btech.model.UserEngag;
import com.btech.model.UserStarterPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface UserStarterPageRepository extends JpaRepository<UserStarterPage, Long> {

    List<UserStarterPage> findByUserId(Long id);
    Optional<UserStarterPage> findById(Long id);
    @Query(value = "SELECT status FROM user_starter_page WHERE user_id= ?1", nativeQuery = true)
    ArrayList<String> getStatusesByUserId(Long id);
}
