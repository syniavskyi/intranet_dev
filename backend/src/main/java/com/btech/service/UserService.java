package com.btech.service;

import com.btech.model.UserContacts;
import com.btech.model.UserDetail;
import com.btech.model.UserInfo;
import com.btech.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.btech.model.User;
import com.btech.pojo.Email;
import com.btech.pojo.UserRegistration;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {

	private final SMTPMailSender smtp;
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;
    private final UserContactsRepository userContactsRepository;
    private final UserInfoRepository userInfoRepository;
    private final UserDetailsRepository userDetailsRepository;

    @Autowired
    public UserService(UserRepository userRepository, EmailRepository emailRepository, UserContactsRepository userContactsRepository, SMTPMailSender smtp, UserInfoRepository userInfoRepository, UserDetailsRepository userDetailsRepository) {
    	this.userRepository = userRepository;
    	this.emailRepository = emailRepository;
    	this.userContactsRepository = userContactsRepository;
    	this.smtp = smtp;
    	this.userInfoRepository = userInfoRepository;
    	this.userDetailsRepository = userDetailsRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    public String calculateMD5(String password) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(password.getBytes());
		byte[] digest = md.digest();
		StringBuffer result = new StringBuffer();
		for (byte b : digest) {
			result.append(String.format("%02x", b & 0xff));
		}		
		return result.toString();
    }

	public Long calculateSeniority(Long id) throws ParseException {
		UserDetail ud = userDetailsRepository.findById(id);
		SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
		String date = sdf.format(new Date());
		Date todayDate = sdf.parse(date);
		Date employmentDate = sdf.parse(ud.getEmploymentDate());

		long diffInMillies = Math.abs(todayDate.getTime() - employmentDate.getTime());
		long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
		return diff;
	}

    public void save(User user) throws NoSuchAlgorithmException{
        user.setPassword(calculateMD5(user.getPassword()));
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
    	userRepository.save(new User(userRegistration.getUsername(), userRegistration.getPassword(), userRegistration.getEmail(), userRegistration.getRoles(), userRegistration.getDeps(), userRegistration.getUserInfo(), userRegistration.getUserContacts(), userRegistration.getUserDetails(), userRegistration.getFullName(), userRegistration.getSlackName()));
        /*smtp.emailSenderInit(userRegistration.getEmail(), "BTech 2.0 - Registration Process", "Your profile's password :" + userRegistration.getPassword());*/
        return "Account has been created successfully and is ready to use. Email with password was sent to " + userRegistration.getEmail();
    }

	public String updateContacts(Long id, String address, String email, String phone, String skypeId, String slackId) {
    	UserContacts uc = userContactsRepository.findById(id);
    	uc.setAddress(address);
    	uc.setEmail(email);
    	uc.setPhone(phone);
    	uc.setSkypeId(skypeId);
    	uc.setSlackId(slackId);
    	userContactsRepository.save(uc);
    	return "Contacts have been changed !";
	}
	
	public String updateInfo(Long id, String firstName, String lastName, String gender, String birthDate, String image) {
		UserInfo ui = userInfoRepository.findById(id);
		ui.setFirstName(firstName);
		ui.setLastName(lastName);
		ui.setGender(gender);
		ui.setBirthDate(birthDate);
		ui.setImage(image);
		userInfoRepository.save(ui);
		return "User info has been changed !";
	}

	public String updateDetail(Long id, String branch, String section, String position, String currentProject, String state, String employmentDate) throws ParseException {
    	UserDetail ud = userDetailsRepository.findById(id);
    	ud.setBranch(branch);
    	ud.setSection(section);
    	ud.setPosition(position);
    	ud.setCurrentProject(currentProject);
    	ud.setState(state);
    	ud.setEmploymentDate(employmentDate);
    	ud.setSeniority(calculateSeniority(id));
    	userDetailsRepository.save(ud);
    	return "User detail has been changed !";
	}
	
	public String resetPasswordNew(String email, String password) {
		User u = userRepository.findByEmail(email);
		u.setPassword(password);
		userRepository.save(u);
		smtp.emailSenderInit(email, "Btech 2.0 - Password Reset", "Your password has been changed : " + password);
		return "Password has been chaged !";
	}
	
	public UserInfo getUserInfoById(Long id) {
		return userInfoRepository.findOne(id);				
	}
	
	public UserContacts getUserContactById(Long id) {
		return userContactsRepository.findById(id);
	}

	public User getUserByUsername(String name) {
		return userRepository.findByUsername(name);
	}

	public UserDetail getUserDetailById(Long id) {
    	return userDetailsRepository.findById(id);
	}

}