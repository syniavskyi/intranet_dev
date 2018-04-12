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
	@Column(name="role_id")
	private Long roleId;
	@Column(name="role_name")
	private String roleName;
	
	public RolesList() {
		
	}
	
	public RolesList(Long roleId, String roleName) {
		this.roleId = roleId;
		this.roleName = roleName;
	}

	
	public Long getRoleId() {
		return roleId;
	}

	public void setId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}
