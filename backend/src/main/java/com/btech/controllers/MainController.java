package com.btech.controllers;

import com.btech.model.Error;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MainController {

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
	
}