package com.btech.repositories;


import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);

}