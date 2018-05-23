package com.btech.service;

import com.btech.exceptions.CustomResourceNotFoundException;
import com.btech.model.UserDocuments;
import com.btech.repositories.UserDocumentsRepository;
import com.btech.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class UserDocumentsService {

    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;
    private final UserDocumentsRepository userDocumentsRepository;

    @Autowired
    public UserDocumentsService(FileStorageService fileStorageService,UserRepository userRepository, UserDocumentsRepository userDocumentsRepository) {
        this.fileStorageService = fileStorageService;
        this.userRepository = userRepository;
        this.userDocumentsRepository = userDocumentsRepository;
    }

    public UserDocuments uploadUserDocument(Long id, MultipartFile file, String title, String description, String lang) {
        String fileName = fileStorageService.storeFile(file, "file");
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/files/downloadFile/").path(fileName).toUriString();
        UserDocuments ud = new UserDocuments();
        return userRepository.findById(id).map(user -> {
            ud.setUser(user);
            ud.setTitle(title);
            ud.setDescription(description);
            ud.setLang(lang);
            ud.setLink(fileDownloadUri);
            return userDocumentsRepository.save(ud);
        }).orElseThrow(() -> new CustomResourceNotFoundException("Id " + id + " not found"));
    }

    public ResponseEntity<?> deleteUserDocument(Long id, Long userDocumentId) {
        if(!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("Id " + id + " not found");
        }
        return userDocumentsRepository.findById(userDocumentId).map(userDocuments -> {
            userDocumentsRepository.delete(userDocuments);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserId " + userDocumentId + " not found"));
    }

    public UserDocuments updateUserDocument(Long id, Long userDocumentId, UserDocuments userDocumentsRequest) {
        if (!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("UserId " + id + " not found");
        }
        return userDocumentsRepository.findById(userDocumentId).map(userDocuments -> {
            userDocuments.setDescription(userDocumentsRequest.getDescription());
            userDocuments.setLang(userDocumentsRequest.getLang());
            userDocuments.setLink(userDocumentsRequest.getLink());
            userDocuments.setTitle(userDocumentsRequest.getTitle());
            return userDocumentsRepository.save(userDocuments);
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserDocumentId " + userDocumentId + "not found"));
    }
}
