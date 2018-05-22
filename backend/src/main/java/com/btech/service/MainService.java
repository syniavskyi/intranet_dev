package com.btech.service;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
public class MainService {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public String calculateMD5(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        StringBuffer result = new StringBuffer();
        for (byte b : digest) {
            result.append(String.format("%02x", b & 0xff));
        }
        return result.toString();
    }

    public String calculateSHA(String input) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes("UTF-8"));
            StringBuffer hexString = new StringBuffer();

            for (int i = 0; i < hash.length; i++) {
                String hex = Integer.toHexString(0xff & hash[i]);
                if(hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }

    public String reverseDate(String input) throws ParseException {
        DateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss", Locale.US);
        Date date = inputFormat.parse(input);
        System.out.println(input);
        SimpleDateFormat formatter = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss 'GMT 'z", Locale.US);
        return formatter.format(date);
    }

    public String formatDate(String input) throws ParseException {
        DateFormat inputFormat = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss 'GMT'z", Locale.US);
        Date date = inputFormat.parse(input);
        System.out.println(input);
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss", Locale.US);
        return formatter.format(date);
    }
}
