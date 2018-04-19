package com.btech.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="username")
    private String username;

    @JsonIgnore
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Role> roles;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Dep> deps;


    public User() {
    	
    }

    public User(String username, String password, String email, List<Role> roles, List<Dep> deps) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.email = email;
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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Dep> getDeps() {
		return deps;
	}

	public void setDeps(List<Dep> deps) {
		this.deps = deps;
	}	
  
}