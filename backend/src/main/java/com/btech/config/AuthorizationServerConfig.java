package com.btech.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(authenticationManager);
	}


	@Override
	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
		security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
	}
	
	@Bean
	@Primary
	public TokenStore tokenStore() {
	    return new InMemoryTokenStore();
	}

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory().withClient("vuejs-client-admin")
			.authorizedGrantTypes("client_credentials", "password", "authorization_code", "refresh_token")
			.authorities("ROLE_ADMIN")
			.scopes("read", "write")
			.resourceIds("oauth2-resource")
			.accessTokenValiditySeconds(5000)
			.refreshTokenValiditySeconds(3600)
			.secret("password")
			.and()
			.withClient("vuejs-client-management")
			.authorizedGrantTypes("client_credentials", "password", "authorization_code", "refresh_token")
			.authorities("ROLE_MANAGEMENT")
			.scopes("read")
			.resourceIds("oauth2-resource")
			.accessTokenValiditySeconds(5000)
			.refreshTokenValiditySeconds(3600)
			.secret("password");
	}
	
}
