package com.btech.controllers;

import com.btech.pojo.DepsList;
import com.btech.pojo.Email;
import com.btech.pojo.RolesList;
import com.btech.service.RepoService;
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
	
	private final RepoService repoService;
	private final AuthorizationServerTokenServices authorizationServerTokenServices;
	private final ConsumerTokenServices consumerTokenServices;
	private final UserService userService;

	
	@Autowired
	public MainController(RepoService repoService,AuthorizationServerTokenServices authorizationServerTokenServices, ConsumerTokenServices consumerTokenServices, UserService userService) {
		this.repoService = repoService;
		this.authorizationServerTokenServices = authorizationServerTokenServices;
		this.consumerTokenServices = consumerTokenServices;
		this.userService = userService;
	}

	@CrossOrigin
	@GetMapping(value="/api")
	public String home() {
		return "Public Section";
	}
	
	@CrossOrigin
	@GetMapping(value="/api/secured")
	public String privateArea() {
		return "Secured Area - Acces for [ADMIN] || [MANAGEMENT] authorities";
	}
	
	@CrossOrigin
	@GetMapping("/api/authentication-error")
	public String authenticationError() {
		return "Access denied";
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/rolesList", method = RequestMethod.GET)
	public List<RolesList> getRolesList() {
		return repoService.getAllRoles();
	}
	
	@CrossOrigin
	@RequestMapping(value="/api/depsList", method = RequestMethod.GET)
	public List<DepsList> getDepsList() {
		return repoService.getAllDeps();
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