package com.btech.repositories;

import com.btech.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetail, Long> {

    UserDetail findById(Long id);
}
