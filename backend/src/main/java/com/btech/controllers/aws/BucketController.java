package com.btech.controllers.aws;

import com.btech.service.AmazonClient;
import com.btech.service.AmazonFileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/storage")
public class BucketController {

    private final AmazonFileStorageService afs;
    private final AmazonClient amazonClient;

    @Autowired
    BucketController(AmazonFileStorageService afs, AmazonClient amazonClient) {
        this.afs = afs;
        this.amazonClient = amazonClient;
    }

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.afs.uploadFile(file);
    }

    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.afs.deleteFileFromS3Bucket(fileUrl);
    }

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestPart(value = "file") MultipartFile file, @RequestParam("id") Long id) {
        return this.amazonClient.uploadImage(id, file);
    }
}

