package com.btech.repositories;

import com.btech.model.UserContacts;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserContactsRepository extends JpaRepository<UserContacts, Long> {
	
	UserContacts findById(Long id);

}
