package com.btech.config.auth;

import com.btech.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

import com.btech.pojo.Regex;
import com.btech.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class AuthenticationServerConfig {

    private final Regex regex;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationServerConfig(Regex regex, PasswordEncoder passwordEncoder) {
        this.regex = regex;
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void authenticationManager(AuthenticationManagerBuilder builder, UserRepository repository) throws Exception {
        builder.userDetailsService(userDetailsService(repository)).passwordEncoder(passwordEncoder);
    }

    private UserDetailsService userDetailsService(final UserRepository repository) {
        return login -> {
            if (regex.checkByEmail(login)) {
                return new CustomUserDetails(repository.findByEmail(login));
            } else if (regex.checkBy3chars(login)) {
                return new CustomUserDetails(repository.findByUsername(login));
            } else if (regex.checkBySlackName(login)) {
                return new CustomUserDetails(repository.findBySlackName(login));
            } else {
                return new CustomUserDetails(repository.findByFullName(login));
            }
        };
    }
}