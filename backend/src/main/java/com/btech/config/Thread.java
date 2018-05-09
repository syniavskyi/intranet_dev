package com.btech.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Date;

@Configuration
@EnableScheduling
public class Thread {

/*    @Scheduled(fixedRate = 10000)
    public void run() {
        System.out.println("Thread initiated at " + new Date());
    }*/
}
