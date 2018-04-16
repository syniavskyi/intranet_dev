package com.btech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.btech.model.Employee;
import com.btech.service.EmployeeService;

@RestController

public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@CrossOrigin
    @RequestMapping(value = "/api/employee/{id}", method = RequestMethod.GET)
    public Employee getEmployeeDetail(@PathVariable Long id) {
		return employeeService.getEmployees(id);
    }
    
	@CrossOrigin
    @GetMapping(value="/api/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    
    

}
