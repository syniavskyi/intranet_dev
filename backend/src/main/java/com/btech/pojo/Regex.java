package com.btech.pojo;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class Regex {
	
	private static final String emailRegex = "^[A-Za-z0-9._%+-]+@btech.pl$";
	private static final String threeCharsLoginRegex = "[a-zA-Z0-9]{1,3}";
	
	public boolean checkBy3chars(String input) {
		Pattern pattern = Pattern.compile(threeCharsLoginRegex);
		Matcher matcher = pattern.matcher(input);
        return matcher.matches();
	}
	
	public boolean checkByEmail(String input) {
		Pattern pattern = Pattern.compile(emailRegex);
		Matcher matcher = pattern.matcher(input);
		return matcher.matches();
	}
	
	public boolean checkBySlackName(String input) {
		char dot_char = input.charAt(1);
		String data = Character.toString(dot_char);
		return data.contains(".");
	}
}