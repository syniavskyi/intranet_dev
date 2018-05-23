package com.btech.controllers;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.text.ParseException;
import java.util.*;

import com.btech.model.*;
import com.btech.repositories.UserDetailsRepository;
import com.btech.repositories.UserEngagRepository;
import com.btech.repositories.UserRepository;
import com.btech.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.btech.pojo.UserRegistration;

import javax.validation.Valid;

@RestController
public class UserController {
	
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository){
    	this.userService = userService;
    	this.userRepository = userRepository;
    }

    @CrossOrigin
    @PostMapping(value="/api/register") 
    public String register(@RequestBody UserRegistration userRegistration) throws NoSuchAlgorithmException {
        return userService.userRegistration(userRegistration);
    }

    @CrossOrigin
    @GetMapping(value="/api/users")
    public List<User> users() {
        return userService.getAllUsers();
    }

    @CrossOrigin
    @GetMapping(value="/api/getCurrentRole")
    public Collection<? extends GrantedAuthority> currentUserRole(Authentication authentication) {
    	UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    	return userDetails.getAuthorities();
    }
    
    @CrossOrigin
    @RequestMapping(value = "api/getUsernameByToken", method = RequestMethod.GET)
    @ResponseBody
    public User currentUserName(Principal principal) {
        return userService.getUserByUsername(principal.getName());
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
    
    @CrossOrigin
    @RequestMapping(value = "/api/user/password/resetNew/", method = RequestMethod.POST)
    public String resetPasswordNew(@RequestParam("email") String email,
                                   @RequestParam("password") String password) {
    	return userService.resetPasswordNew(email, password);	
    }

    @GetMapping("/api/users/{id}/showStartPage")
    public boolean checkStartPageVisible(@PathVariable(value="id") Long id) {
        User user = userRepository.findOne(id);
        return user.isStartPageVisible();
    }

    @GetMapping("/api/users/{id}/showUserPosition")
    public String showUserPosition(@PathVariable(value="id") Long id) {
        User user = userRepository.findOne(id);
        return user.getGroup();
    }

}