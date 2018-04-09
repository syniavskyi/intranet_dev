package com.btech.oauth2;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

import com.btech.oauth2.model.Role;
import com.btech.oauth2.model.User;
import com.btech.oauth2.repositories.UserRepository;
import com.btech.oauth2.service.UserService;


@SpringBootApplication
public class InitApp {

	public static void main(String[] args) {
		SpringApplication.run(InitApp.class, args);
	}

	@Autowired
	public void authenticationManager(AuthenticationManagerBuilder builder, UserRepository repo, UserService userService) throws Exception {
		//if necessary add user manually
		/*if(repo.count() == 0) {
			userService.save(new User("admin", "password", Arrays.asList(new Role("USER"), new Role("ACTUATOR") , new Role("ADMIN"))));
		}*/
		builder.userDetailsService (s -> new CustomUserDetails(repo.findByUsername(s)));
	}
	
}