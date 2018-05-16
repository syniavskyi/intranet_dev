package com.btech.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.btech.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	User findByEmail(String email);
	User findBySlackName(String slackName);
	User findByFullName(String fullName);
	Optional<User> findById(Long id);
	boolean existsById(Long id);
}