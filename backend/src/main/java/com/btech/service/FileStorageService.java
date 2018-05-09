package com.btech.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.btech.exceptions.FileStorageException;
import com.btech.exceptions.FileNotFoundException;
import com.btech.pojo.FileStorageProperties;

@Service
public class FileStorageService {

    private final Path documentsStorageLocation;
    private final Path imageStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.documentsStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/documents").toAbsolutePath().normalize();
        this.imageStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/images").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.documentsStorageLocation);
            Files.createDirectories(this.imageStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Error while creating folder", ex);
        }
    }

    public String storeFile(MultipartFile file, String type) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Error invalid path sequence " + fileName);
            }
            if (type == "file") {
                Path targetLocation = this.documentsStorageLocation.resolve(fileName);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                return fileName;
            }else if (type == "image") {
                Path targetLocation = this.imageStorageLocation.resolve(fileName);
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                return fileName;
            }
        } catch (IOException ex) {
            throw new FileStorageException("Error while saving file " + fileName + ". Try again", ex);
        }
        return null;
    }

    public Resource loadFileAsResource(String fileName, String type) {
        if (type == "file") {
            try {
                Path filePath = this.documentsStorageLocation.resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else {
                    throw new FileNotFoundException("File not found " + fileName);
                }
            } catch (MalformedURLException ex) {
                throw new FileNotFoundException("File not found " + fileName, ex);
            }
        } else if (type == "image") {
            try {
                Path filePath = this.imageStorageLocation.resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else {
                    throw new FileNotFoundException("File not found " + fileName);
                }
            } catch (MalformedURLException ex) {
                throw new FileNotFoundException("File not found " + fileName, ex);
            }
        }
        return null;
    }
}