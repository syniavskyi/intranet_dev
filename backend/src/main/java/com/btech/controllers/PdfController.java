package com.btech.controllers;

import com.btech.model.User;
import com.btech.model.UserInfo;
import com.btech.repositories.UserInfoRepository;
import com.btech.repositories.UserRepository;
import com.btech.service.GeneratePdfReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class PdfController {

    private final UserInfoRepository userInfoRepository;

    @Autowired
    public PdfController(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    @RequestMapping(value = "/api/pdf/generateUsersReport", method = RequestMethod.GET, produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> usersReport() throws IOException {
        List<UserInfo> usersInfo = userInfoRepository.findAll();
        ByteArrayInputStream bis = GeneratePdfReport.usersReport(usersInfo);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=UsersReport.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(bis));
    }
}