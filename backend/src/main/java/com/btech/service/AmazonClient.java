package com.btech.service;

import com.btech.model.UserInfo;
import com.btech.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AmazonClient {

    private final AmazonFileStorageService afss;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public AmazonClient(AmazonFileStorageService afss, UserInfoRepository userInfoRepository) {
        this.afss = afss;
        this.userInfoRepository = userInfoRepository;
    }

    public String uploadImage(Long id, MultipartFile file) {
        String fileUrl = afss.uploadFile(file);
        UserInfo ui = userInfoRepository.findById(id);
        ui.setImage(fileUrl);
        userInfoRepository.save(ui);
        return "Success";
    }
}