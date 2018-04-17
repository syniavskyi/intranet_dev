package com.btech.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.btech.model.User;
import com.btech.pojo.UserRegistration;
import com.btech.service.UserService;

import java.util.Collection;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;  

    @CrossOrigin
    @PostMapping(value="/api/register") 
    public String register(@RequestBody UserRegistration userRegistration) {
    	
        if(!userRegistration.getPassword().equals(userRegistration.getPasswordConfirmation())) {
            return "Error passwords do not match";
        } else if(userService.getUser(userRegistration.getUsername()) != null) {
            return "Error this username already exists";
        }
        userService.save(new User(userRegistration.getUsername(), userRegistration.getPassword(), userRegistration.getPasswordConfirmation(), userRegistration.getEmail(), userRegistration.getRoleId()));
        return "Account has been created successfully and is ready to use";
    }

    @CrossOrigin
    @GetMapping(value="/api/users")
    public List<User> users() {
        return userService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping(value="/api/getCurrentRole")
        public Collection<? extends GrantedAuthority> currentUserName(Authentication authentication) {
    		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    		return userDetails.getAuthorities();
        }
    
    @CrossOrigin
    @RequestMapping(value = "/api/users/{id}", method = RequestMethod.GET)
    public User getUserDetail(@PathVariable Long id) {
		return userService.getUserById(id);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/api/user/{username}", method = RequestMethod.GET)
    public User getUserDetail(@PathVariable String username) {
		return userService.getUser(username);
    }
    
}