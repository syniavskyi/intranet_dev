package com.btech.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.btech.model.User;
import com.btech.pojo.UserRegistration;
import com.btech.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;  

    @PostMapping(value="/api/register") 
    public String register(@RequestBody UserRegistration userRegistration) {
    	
        if(!userRegistration.getPassword().equals(userRegistration.getPasswordConfirmation())) {
            return "Error the two passwords do not match";
        } else if(userService.getUser(userRegistration.getUsername()) != null) {
            return "Error this username already exists";
        }
        userService.save(new User(userRegistration.getUsername(), userRegistration.getPassword(), userRegistration.getPasswordConfirmation(), userRegistration.getEmail(), userRegistration.getRoleId()));
        return "Account has been created successfully and is ready to use";
    }

    @GetMapping(value="/api/users")
    public List<User> users() {
        return userService.getAllUsers();
    }

    @GetMapping(value="/api/getUsername")
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    
    @RequestMapping(value = "/api/users/{id}", method = RequestMethod.GET)
    public User getUserDetail(@PathVariable Long id) {
		return userService.getUserById(id);
    }
    
    @RequestMapping(value = "/api/user/{username}", method = RequestMethod.GET)
    public User getUserDetail(@PathVariable String username) {
		return userService.getUser(username);
    }
    
}