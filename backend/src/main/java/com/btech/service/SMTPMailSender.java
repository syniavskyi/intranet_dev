package com.btech.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class SMTPMailSender {

	private final JavaMailSender jms;

	@Autowired
	public SMTPMailSender(JavaMailSender jms) {
		this.jms = jms;
	}
	
	public void emailSenderInit(String email,String subject, String text) {
    	try {
			sendMail(email, subject, text);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
	
	public void sendMail(String recipient, String subject, String text) throws MessagingException {
		MimeMessage message = jms.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setSubject(subject);
		helper.setTo(recipient);
		helper.setText(text);		
		jms.send(message);		
	}
	
}
