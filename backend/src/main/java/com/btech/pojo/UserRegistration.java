package com.btech.pojo;

import java.util.HashSet;
import java.util.List;

import com.btech.model.*;

public class UserRegistration {
	
	private String username;
	private String password;
	private String email;
	private List<Role> roles;
	private List<Dep> deps;
	private List<UserInfo> userInfo;
	private List<UserContacts> userContacts;
	private List<UserDetail> userDetails;
	private String fullName;
	private String slackName;

	public UserRegistration() {}
	
	public UserRegistration(String username, String password, String email, List<Role> roles, List<Dep> deps, List<UserInfo> userInfo, List<UserContacts> userContacts, List<UserDetail> userDetails, String fullName, String slackName) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.roles = roles;
		this.deps = deps;
		this.userInfo = userInfo;
		this.userContacts = userContacts;
		this.userDetails = userDetails;
		this.fullName = fullName;
		this.slackName = slackName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public List<Dep> getDeps() {
		return deps;
	}

	public void setDeps(List<Dep> deps) {
		this.deps = deps;
	}

	public List<UserInfo> getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(List<UserInfo> userInfo) {
		this.userInfo = userInfo;
	}

	public List<UserContacts> getUserContacts() {
		return userContacts;
	}

	public void setUserContacts(List<UserContacts> userContacts) {
		this.userContacts = userContacts;
	}

	public List<UserDetail> getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(List<UserDetail> userDetails) {
		this.userDetails = userDetails;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getSlackName() {
		return slackName;
	}

	public void setSlackName(String slackName) {
		this.slackName = slackName;
	}
	
		
}
