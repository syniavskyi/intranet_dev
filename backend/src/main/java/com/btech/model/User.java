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
    @JsonIgnore
    private String email;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Role> roles;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Dep> deps;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserInfo> userInfo;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserContacts> userContacts;
    @OneToMany
    private List<UserDetail> userDetails;
    @Column(name="full_name")
    @JsonIgnore
    private String fullName;
    @Column(name="slack_name")
    @JsonIgnore
    private String slackName;

    public User() {}

    public User(String username, String password, String email, List<Role> roles, List<Dep> deps, List<UserInfo> userInfo, List<UserContacts> userContacts, List<UserDetail> userDetails, String fullName, String slackName) {
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.email = email;
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

	@Override
	public String toString() {
		return String.format(
				"User [id=%s, username=%s, password=%s, email=%s, roles=%s, deps=%s, userInfo=%s, userContacts=%s]", id,
				username, password, email, roles, deps, userInfo, userContacts);
	}

}