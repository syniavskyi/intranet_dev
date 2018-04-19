package com.btech;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

import com.btech.config.CustomUserDetails;
import com.btech.repositories.UserRepository;
import com.btech.service.UserService;


@SpringBootApplication
public class InitApp {

	public static void main(String[] args) {
		SpringApplication.run(InitApp.class, args);
	}

	@Autowired
	public void authenticationManager(AuthenticationManagerBuilder builder, UserRepository repo, UserService userService) throws Exception {
		builder.userDetailsService (s -> new CustomUserDetails(repo.findByUsername(s)));
	}	
}