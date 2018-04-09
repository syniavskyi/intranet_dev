package com.btech.oauth2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.btech.oauth2.model.Role;
import com.btech.oauth2.model.User;
import com.btech.oauth2.pojo.UserRegistration;
import com.btech.oauth2.service.UserService;

import java.util.Arrays;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;  

    @PostMapping(value="/register") 
    public String register(@RequestBody UserRegistration userRegistration) {
    	
        if(!userRegistration.getPassword().equals(userRegistration.getPasswordConfirmation())) {
            return "Error the two passwords do not match";
        } else if(userService.getUser(userRegistration.getUsername()) != null) {
            return "Error this username already exists";
        }
        
        userService.save(new User(userRegistration.getUsername(), userRegistration.getPassword(), Arrays.asList(new Role("USER"), new Role("ACTUATOR"))));
        return "User created successfully";
    }

    @GetMapping(value="/users")
    public List<User> users() {
        return userService.getAllUsers();
    }

    @GetMapping(value="/getUsername")
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    
}
