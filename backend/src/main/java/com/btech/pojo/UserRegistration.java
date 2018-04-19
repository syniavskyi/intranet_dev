package com.btech.pojo;

import java.util.List;

import com.btech.model.Dep;
import com.btech.model.Role;

public class UserRegistration {
	
	private String username;
	private String password;
	private String email;
	private List<Role> roles;
	private List<Dep> deps;

	
	public UserRegistration() {
		
	}
	
	public UserRegistration(String username, String password, String email, List<Role> roles, List<Dep> deps) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.roles = roles;
		this.deps = deps;
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
		
}
