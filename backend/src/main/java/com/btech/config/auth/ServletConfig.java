package com.btech.config.auth;

import com.btech.InitApp;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

public class ServletConfig extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(InitApp.class);
	}

	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
		return (container -> {
			container.setContextPath("");
			if (System.getenv("PORT") != null) {
				container.setPort(Integer.valueOf(System.getenv("PORT")));
			}
		});
	}
}
