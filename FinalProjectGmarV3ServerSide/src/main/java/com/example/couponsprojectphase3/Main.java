package com.example.couponsprojectphase3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableScheduling
public class Main {

	public static void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(Main.class, args);
		System.out.println("Coupon System Server is up and running");
    }

	@Bean
	public Set<String> activeTokens() {
		return new HashSet<>();
	}

}
