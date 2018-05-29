package com.btech.controllers;

import com.btech.model.UserEngag;
import com.btech.repositories.UserEngagRepository;
import com.btech.service.UserEngagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserEngagController {

    private final UserEngagRepository userEngagRepository;
    private final UserEngagService userEngagService;

    @Autowired
    public UserEngagController(UserEngagRepository userEngagRepository, UserEngagService userEngagService) {
        this.userEngagRepository = userEngagRepository;
        this.userEngagService = userEngagService;
    }

    @GetMapping("/api/users/{id}/userEngag")
    public List<UserEngag> getUserEngagByPostId(@PathVariable(value = "id") Long id) {
        return  userEngagRepository.findByUserId(id);
    }

    @PostMapping("/api/users/{id}/userEngag/create")
    public List<UserEngag> createUserEngag(@PathVariable (value = "id") Long id, @Valid @RequestBody UserEngag userEngag) {
        return userEngagService.createUserEngag(id, userEngag);
    }

    @DeleteMapping("/api/users/{id}/userEngag/{userEngagId}/delete")
    public ResponseEntity<?> deleteUserEngag(@PathVariable (value = "id") Long id, @PathVariable (value = "userEngagId") Long userEngagId) {
        return userEngagService.deleteUserEngag(id, userEngagId);
    }

    @PutMapping("/api/users/{id}/userEngag/{userEngagId}/edit")
    public UserEngag updateUserEngag(@PathVariable (value = "id") Long id, @PathVariable (value = "userEngagId") Long userEngagId, @Valid @RequestBody UserEngag userEngagRequest) {
        return userEngagService.updateUserEngag(id, userEngagId, userEngagRequest);
    }
}
