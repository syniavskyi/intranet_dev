package com.btech.oauth2.controller;

import com.btech.oauth2.model.Error;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MainController {

	@GetMapping(value="/")
	public String home() {
		return "Public Section";
	}
	
	@GetMapping(value="/secured")
	public String privateArea() {
		return "Secured Area - Acces granted with token";
	}
	
	@GetMapping("/authentication-error")
	public Error authenticationError() {
		Error error = new Error(530, "You are not authenticated !", "/oauth/token");
		return error;
	}
	
	
}