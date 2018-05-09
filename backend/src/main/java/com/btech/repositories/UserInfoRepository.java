package com.btech.repositories;

import com.btech.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

	UserInfo findById(Long id);
}