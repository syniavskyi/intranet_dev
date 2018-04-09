package com.btech.oauth2.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.oauth2.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	
}