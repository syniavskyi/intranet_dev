package com.btech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.btech.pojo.FileStorageProperties;

@EnableConfigurationProperties({FileStorageProperties.class})
@SpringBootApplication
public class InitApp {
	
	public static void main(String[] args) {
		SpringApplication.run(InitApp.class, args);
	}

}