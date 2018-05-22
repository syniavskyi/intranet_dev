package com.btech.service;

import com.btech.model.UserContacts;
import com.btech.repositories.UserContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserContactsService {

    private final UserContactsRepository userContactsRepository;

    @Autowired
    public UserContactsService(UserContactsRepository userContactsRepository) {
        this.userContactsRepository = userContactsRepository;
    }

    public UserContacts getUserContactById(Long id) {
        return userContactsRepository.findById(id);
    }

    public String updateContacts(Long id, String address, String email, String phone, String skypeId, String slackId) {
        UserContacts uc = userContactsRepository.findById(id);
        uc.setAddress(address);
        uc.setEmail(email);
        uc.setPhone(phone);
        uc.setSkypeId(skypeId);
        uc.setSlackId(slackId);
        userContactsRepository.save(uc);
        return "Contacts have been changed !";
    }

}
