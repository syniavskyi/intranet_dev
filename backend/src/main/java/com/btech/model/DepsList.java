package com.btech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="deps_list")
public class DepsList {
	
	@Id
	@GeneratedValue
	@Column(name="dep_id")
	private String depId;
	@Column(name="dep_name")
	private String depName;
	
	public DepsList() {
		
	}
	
	public DepsList(String depId, String depName) {
		this.depId = depId;
		this.depName = depName;
	}

	
	public String getDepId() {
		return depId;
	}

	public void setDepId(String depId) {
		this.depId = depId;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

}