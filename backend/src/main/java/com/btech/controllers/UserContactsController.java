package com.btech.controllers;

import com.btech.model.UserContacts;
import com.btech.service.UserContactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserContactsController {

    private final UserContactsService userContactsService;

    @Autowired
    public UserContactsController(UserContactsService userContactsService) {
        this.userContactsService = userContactsService;
    }

    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/contactNew/", method = RequestMethod.POST)
    public String changeContact(@RequestParam("id") Long id,
                                @RequestParam(value = "address", required = false) String address,
                                @RequestParam(value = "email", required = false) String email,
                                @RequestParam(value = "phone", required = false) String phone,
                                @RequestParam(value = "skypeId", required = false) String skypeId,
                                @RequestParam(value = "slackId", required = false) String slackId) {
        return userContactsService.updateContacts(id, address, email, phone, skypeId, slackId);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userContact/{id}", method = RequestMethod.GET)
    public UserContacts getUserContactById(@PathVariable Long id) {
        return userContactsService.getUserContactById(id);
    }
}
