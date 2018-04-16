package com.btech.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	//Fixes "Response for preflight has invalid HTTP status code 401" error.
	
     @Bean
     public FilterRegistrationBean myCorsFilter() {
          UrlBasedCorsConfigurationSource ubccs = new UrlBasedCorsConfigurationSource();
          CorsConfiguration config = new CorsConfiguration();
          config.setAllowCredentials(true);
          config.addAllowedOrigin("http://localhost:8080");
          config.addAllowedHeader("*");
          config.addAllowedMethod("*");
          ubccs.registerCorsConfiguration("/**", config);
          FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(ubccs));
          bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
          return bean;
     }
}