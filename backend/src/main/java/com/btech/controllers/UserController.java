package com.btech.controllers;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import com.btech.model.UserContacts;
import com.btech.model.UserInfo;
import com.btech.model.UserDetail;
import com.btech.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.btech.model.User;
import com.btech.pojo.UserRegistration;
import com.btech.service.UserService;

@RestController
public class UserController {
	
    private final UserService userService;
    private final UserDetailsRepository userDetailsRepository;
    
    @Autowired
    public UserController(UserService userService, UserDetailsRepository userDetailsRepository) {
    	this.userService = userService;
    	this.userDetailsRepository = userDetailsRepository;
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
    
    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/contactNew/", method = RequestMethod.POST)
    public String changeContact(@RequestParam("id") Long id,
                                @RequestParam(value = "address", required = false) String address,
                                @RequestParam(value = "email", required = false) String email,
                                @RequestParam(value = "phone", required = false) String phone,
                                @RequestParam(value = "skypeId", required = false) String skypeId,
                                @RequestParam(value = "slackId", required = false) String slackId) {
    	return userService.updateContacts(id, address, email, phone, skypeId, slackId); 
    }
    
    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/info", method = RequestMethod.POST)
    public String changeInfo(@RequestParam(value = "id", required = false) Long id,
                             @RequestParam(value = "firstName", required = false) String firstName,
                             @RequestParam(value = "lastName", required = false) String lastName,
                             @RequestParam(value = "gender", required = false) String gender,
                             @RequestParam(value = "birthDate", required = false) String birthDate,
                             @RequestParam(value = "image", required = false) String image) {
    	return userService.updateInfo(id, firstName, lastName, gender, birthDate, image);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/detail", method = RequestMethod.POST)
    public String changeDetail(@RequestParam(value = "id") Long id,
                               @RequestParam(value = "branch", required = false) String branch,
                               @RequestParam(value = "section", required = false) String section,
                               @RequestParam(value = "position", required = false) String position,
                               @RequestParam(value = "currentProject", required = false) String currentProject,
                               @RequestParam(value = "state", required = false) String state,
                               @RequestParam(value = "employmentDate", required = false) String employmentDate) throws ParseException {
        return userService.updateDetail(id, branch, section, position, currentProject, state, employmentDate);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userInfo/{id}", method = RequestMethod.GET)
    public UserInfo getUserInfoById(@PathVariable Long id) {
        return userService.getUserInfoById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userContact/{id}", method = RequestMethod.GET)
    public UserContacts getUserContactById(@PathVariable Long id) {
        return userService.getUserContactById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userDetail/{id}", method = RequestMethod.GET)
    public UserDetail getUserDetailById(@PathVariable Long id) throws ParseException {
        UserDetail ud = userDetailsRepository.findById(id);
        ud.setSeniority(userService.calculateSeniority(id));
        return userService.getUserDetailById(id);
    }
    
}