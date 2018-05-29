package com.btech.service;

import com.btech.model.*;
import com.btech.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.btech.pojo.Email;
import com.btech.pojo.UserRegistration;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class UserService {

	private final SMTPMailSender smtp;
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;
	private final MainService mainService;

	@Bean
	public PasswordEncoder getPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Autowired
    public UserService(UserRepository userRepository, EmailRepository emailRepository, SMTPMailSender smtp, MainService mainService) {
    	this.userRepository = userRepository;
    	this.emailRepository = emailRepository;
    	this.smtp = smtp;
    	this.mainService = mainService;
    }

    public void save(User user) throws NoSuchAlgorithmException{
        user.setPassword(mainService.calculateMD5(user.getPassword()));
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

    public String userRegistration(UserRegistration userRegistration) {
    	userRepository.save(new User(userRegistration.getUsername(), userRegistration.getPassword(), userRegistration.getEmail(), userRegistration.getRoles(), userRegistration.getDeps(), userRegistration.getUserInfo(), userRegistration.getUserContacts(), userRegistration.getUserDetails(), userRegistration.getFullName(), userRegistration.getSlackName(), userRegistration.isStartPageVisible(), userRegistration.getGroup()));
        /*smtp.emailSenderInit(userRegistration.getEmail(), "BTech 2.0 - Registration Process", "Your profile's password :" + userRegistration.getPassword());*/
        return "Account has been created successfully and is ready to use. Email with password was sent to " + userRegistration.getEmail();
    }

	public String resetPasswordNew(String email, String password) {
		User u = userRepository.findByEmail(email);
		u.setPassword(password);
		userRepository.save(u);
		smtp.emailSenderInit(email, "Btech 2.0 - Password Reset", "Your password has been changed : " + password);
		return "Password has been chaged !";
	}

	public User getUserByUsername(String name) {
		return userRepository.findByUsername(name);
	}

}