package com.btech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.pojo.Email;

public interface EmailRepository extends JpaRepository<Email, String> {

}
