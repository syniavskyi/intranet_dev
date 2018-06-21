package com.btech.config.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
	
	@Bean
    public TokenStore tokenStore() {
        return new InMemoryTokenStore();
    }

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().exceptionHandling().authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/api/authentication-error"))
							 .accessDeniedPage("/accessDenied")
							 .and().authorizeRequests()
							 .antMatchers("/api/public").permitAll()
							 .antMatchers("/oauth/token").permitAll()
							 .antMatchers("/api/secured").hasAnyRole("MANAGEMENT", "ADMIN")
					         .antMatchers(HttpMethod.OPTIONS, "/oauth/token").permitAll();
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		super.configure(resources);
	}

}