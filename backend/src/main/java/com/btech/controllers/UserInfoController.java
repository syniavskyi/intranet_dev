package com.btech.controllers;

import com.btech.model.UserInfo;
import com.btech.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserInfoController {

    private UserInfoService userInfoService;

    @Autowired
    public UserInfoController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userInfo/{id}", method = RequestMethod.GET)
    public UserInfo getUserInfoById(@PathVariable Long id) {
        return userInfoService.getUserInfoById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/info", method = RequestMethod.POST)
    public String changeInfo(@RequestParam(value = "id", required = false) Long id,
                             @RequestParam(value = "firstName", required = false) String firstName,
                             @RequestParam(value = "lastName", required = false) String lastName,
                             @RequestParam(value = "gender", required = false) String gender,
                             @RequestParam(value = "birthDate", required = false) String birthDate,
                             @RequestParam(value = "image", required = false) String image) {
        return userInfoService.updateInfo(id, firstName, lastName, gender, birthDate, image);
    }
}