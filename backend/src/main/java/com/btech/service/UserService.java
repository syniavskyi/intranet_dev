package com.btech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.btech.model.Email;
import com.btech.model.User;
import com.btech.repositories.EmailRepository;
import com.btech.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailRepository emailRepository;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public void save(User user){
       /* user.setPassword(passwordEncoder().encode(user.getPassword()));*/
        userRepository.save(user);
    }

    public User getUser(String username){
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
    	return userRepository.findOne(id);
    }

    public List<Email> getAllEmails() {
    	return emailRepository.findAll();
    }
    
}
