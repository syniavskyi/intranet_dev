package com.btech.service;

import com.btech.model.UserInfo;
import com.btech.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {

    private final UserInfoRepository userInfoRepository;

    @Autowired
    public UserInfoService(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    public String updateInfo(Long id, String firstName, String lastName, String gender, String birthDate, String image) {
        UserInfo ui = userInfoRepository.findById(id);
        ui.setFirstName(firstName);
        ui.setLastName(lastName);
        ui.setGender(gender);
        ui.setBirthDate(birthDate);
        ui.setImage(image);
        userInfoRepository.save(ui);
        return "User info has been changed !";
    }

    public UserInfo getUserInfoById(Long id) {
        return userInfoRepository.findOne(id);
    }
}
