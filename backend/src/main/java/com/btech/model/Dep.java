package com.btech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="deps")
public class Dep {

	@Id
	@GeneratedValue
	@Column(name="id")
	private Long depId;
	@Column(name="name")
	private String depName;
	
	public Dep() {}
	
	public Dep(String name) {
		this.depName = name;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

}
