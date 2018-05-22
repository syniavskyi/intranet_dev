package com.btech.controllers;

import com.btech.model.User;
import com.btech.model.UserDocuments;
import com.btech.model.UserEngag;
import com.btech.repositories.UserDocumentsRepository;
import com.btech.service.UserDocumentsService;
import com.btech.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserDocumentsController {

    private final UserDocumentsService userDocumentsService;
    private final UserDocumentsRepository userDocumentsRepository;

    @Autowired
    public UserDocumentsController(UserDocumentsRepository userDocumentsRepository, UserDocumentsService userDocumentsService) {
        this.userDocumentsRepository = userDocumentsRepository;
        this.userDocumentsService = userDocumentsService;
    }

    @GetMapping("/api/users/{id}/userDocuments")
    public List<UserDocuments> getUserDocumentsByUserId(@PathVariable(value = "id") Long id) {
        return  userDocumentsRepository.findByUserId(id);
    }

    @PostMapping("/api/users/{id}/userDocuments/create")
    public UserDocuments uploadUserDocument(@PathVariable (value = "id") Long id,
                                            @RequestParam("file") MultipartFile file,
                                            @RequestParam("title") String title,
                                            @RequestParam("description") String description,
                                            @RequestParam("lang") String lang) {
        return userDocumentsService.uploadUserDocument(id, file,  title, description, lang);
    }

    @DeleteMapping("/api/users/{id}/userDocuments/{userDocumentId}/delete")
    public ResponseEntity<?> deleteUserDocument(@PathVariable (value = "id") Long id, @PathVariable (value = "userDocumentId") Long userDocumentId) {
        return userDocumentsService.deleteUserDocument(id, userDocumentId);
    }

    @PutMapping("/api/users/{id}/userDocuments/{userDocumentId}/edit")
    public UserDocuments updateUserEngag(@PathVariable (value = "id") Long id, @PathVariable (value = "userDocumentId") Long userDocumentId, @Valid @RequestBody UserDocuments userDocumentsRequest) {
        return userDocumentsService.updateUserDocument(id, userDocumentId, userDocumentsRequest);
    }
}
