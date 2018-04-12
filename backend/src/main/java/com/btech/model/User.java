package com.btech.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    @JsonIgnore
    private String password;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private List<Role> roles;
    @Column(name="email")
    private String email;

    public User() {}

    public User(String username, String password, String passwordConfirmation, List<Role> roles, String email) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.email = email;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
    
}