package com.btech.controllers;

import com.btech.model.DepsList;
import com.btech.model.Email;
import com.btech.model.RolesList;
import com.btech.pojo.Error;
import com.btech.service.DepsListService;
import com.btech.service.RolesListService;
import com.btech.service.UserService;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {
	
	@Autowired
	private RolesListService rolesListService;
	
	@Autowired
	private DepsListService depsListService;
	
	@Autowired
	private AuthorizationServerTokenServices authorizationServerTokenServices;

	@Autowired
	private ConsumerTokenServices consumerTokenServices;
	
	@Autowired
	private UserService userService;

	@CrossOrigin
	@GetMapping(value="/api")
	public String home() {
		return "Public Section";
	}
	
	@CrossOrigin
	@GetMapping(value="/api/secured")
	public String privateArea() {
		return "Secured Area - Acces granted with token";
	}
	
	@CrossOrigin
	@GetMapping("/api/authentication-error")
	public Error authenticationError() {
		Error error = new Error(530, "You are not authenticated !", "/oauth/token");
		return error;
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/rolesList", method = RequestMethod.GET)
	public List<RolesList> getRolesList() {
		return rolesListService.getAllRoles();
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/depsList", method = RequestMethod.GET)
	public List<DepsList> getDepsList() {
		return depsListService.getAllDeps();
	}
	
	@CrossOrigin
	@RequestMapping("/api/logout")
	public String logout(Principal principal, HttpServletRequest request, HttpServletResponse response) throws IOException {
	    OAuth2Authentication oAuth2Authentication = (OAuth2Authentication) principal;
	    OAuth2AccessToken accessToken = authorizationServerTokenServices.getAccessToken(oAuth2Authentication);
	    consumerTokenServices.revokeToken(accessToken.getValue());
	    return "Token has been destroyed !";
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/emailList", method = RequestMethod.GET)
	public List<Email> getEmails() {
		return userService.getAllEmails();
	}
	
}