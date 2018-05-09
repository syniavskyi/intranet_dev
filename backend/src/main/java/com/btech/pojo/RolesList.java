package com.btech.pojo;

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
	private String roleId;
	@Column(name="role_name")
	private String roleName;
	
	public RolesList() {}
	
	public RolesList(String roleId, String roleName) {
		this.roleId = roleId;
		this.roleName = roleName;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

}