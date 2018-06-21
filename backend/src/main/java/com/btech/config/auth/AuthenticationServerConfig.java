package com.btech.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

import com.btech.pojo.Regex;
import com.btech.repositories.UserRepository;


@Configuration
public class AuthenticationServerConfig {

	private final Regex regex;
	
	@Autowired
	public AuthenticationServerConfig(Regex regex) {
		this.regex = regex;
	}
	
	@Autowired
	public void authenticationManager(AuthenticationManagerBuilder builder, UserRepository userRepository) throws Exception {
		builder.userDetailsService(login -> {
            if (regex.checkByEmail(login)) {
                return new CustomUserDetails(userRepository.findByEmail(login));
            } else if (regex.checkBy3chars(login)) {
                return new CustomUserDetails(userRepository.findByUsername(login));
            } else if (regex.checkBySlackName(login)) {
                return new CustomUserDetails(userRepository.findBySlackName(login));
            } else {
                return new CustomUserDetails(userRepository.findByFullName(login));
            }
        });
	}
}
