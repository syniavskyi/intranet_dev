package com.btech.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import com.btech.model.File;
import com.btech.repositories.UserInfoRepository;
import com.btech.service.FileService;
import com.btech.service.FileStorageService;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
public class FileController {
	
    private final FileService fileService;
    
    @Autowired
    public FileController(FileService fileService) {
    	this.fileService = fileService;
    }
    
    @PostMapping("api/files/uploadImage")
    public File uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
    	return fileService.uploadImage(file, id);
    }
    
    @GetMapping("api/files/downloadImage/{fileName:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String fileName, HttpServletRequest request) {
    	return fileService.downloadFile(fileName, request, "image");
    }

    @GetMapping("api/files/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        return fileService.downloadFile(fileName, request, "file");
    }

    @PostMapping("api/files/uploadFile")
    public File uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) {
        return fileService.uploadFile(file, id);
    }
}