package com.btech.controllers;

import com.btech.model.Error;
import com.btech.model.RolesList;
import com.btech.service.RolesListService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MainController {
	
	@Autowired
	private RolesListService rolesListService;

	@GetMapping(value="/api")
	public String home() {
		return "Public Section";
	}
	
	@GetMapping(value="/api/secured")
	public String privateArea() {
		return "Secured Area - Acces granted with token";
	}
	
	@GetMapping("/api/authentication-error")
	public Error authenticationError() {
		Error error = new Error(530, "You are not authenticated !", "/oauth/token");
		return error;
	}
	
	@GetMapping ("/api/rolesList")
	public List<RolesList> getRolesList() {
		return rolesListService.getAllRoles();
	}
	
}