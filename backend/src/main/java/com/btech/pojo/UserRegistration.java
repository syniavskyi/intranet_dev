package com.btech.pojo;

import java.util.List;

import com.btech.model.Role;

public class UserRegistration {
	
	private String username;
	private String password;
	private String passwordConfirmation;
	private String email;
	private List<Role> roles;
	private String roleId;
	
	public UserRegistration() {
		
	}
	
	public UserRegistration(String username, String password, String passwordConfirmation, String email, String roleId) {
		this.username = username;
		this.password = password;
		this.passwordConfirmation = passwordConfirmation;
		this.email = email;
		this.roleId = roleId;
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

	public String getPasswordConfirmation() {
		return passwordConfirmation;
	}

	public void setPasswordConfirmation(String passwordConfirmation) {
		this.passwordConfirmation = passwordConfirmation;
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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	
}
