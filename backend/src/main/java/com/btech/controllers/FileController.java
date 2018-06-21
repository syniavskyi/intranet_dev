package com.btech.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import com.btech.pojo.File;
import com.btech.service.FileService;

@RestController
public class FileController {
	
    private final FileService fileService;
    
    @Autowired
    public FileController(FileService fileService) {
    	this.fileService = fileService;
    }
    
    @PostMapping("api/files/uploadImage")
    public File uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id) throws ServletException {
    	return fileService.uploadImage(file, id);
    }
    
    @GetMapping("api/files/downloadImage/{fileName:.+}")
    public ResponseEntity<Resource> downloadImage(@PathVariable String fileName, HttpServletRequest request) throws ServletException {
    	return fileService.downloadFile(fileName, request, "image");
    }

    @GetMapping("api/files/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) throws ServletException {
        return fileService.downloadFile(fileName, request, "file");
    }

    @PostMapping("api/files/uploadFile")
    public File uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id)  throws ServletException {
        return fileService.uploadFile(file, id);
    }
}