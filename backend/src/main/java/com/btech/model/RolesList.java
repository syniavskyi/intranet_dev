package com.btech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="roles_list")
public class RolesList {
	
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	@Column(name="name")
	private String roleName;
	
	public RolesList() {
		
	}
	
	public RolesList(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	
}
