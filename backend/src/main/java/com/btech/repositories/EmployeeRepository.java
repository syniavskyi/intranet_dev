package com.btech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	

	
}
