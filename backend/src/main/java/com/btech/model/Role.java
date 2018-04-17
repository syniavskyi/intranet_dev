package com.btech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="role")
public class Role {

    @Id
    @GeneratedValue
    @Column(name="id")
    private String roleId;
    @Column(name="name")
    private String roleName;

    public Role() {
    	
    }

    public Role(String roleName) {
        this.roleName = roleName;
    }

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
   
}