package com.btech.controllers;

import com.btech.model.UserStarterPage;
import com.btech.repositories.UserStarterPageRepository;
import com.btech.service.UserStarterPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class UserStarterPageController {

    private final UserStarterPageService userStarterPageService;
    private final UserStarterPageRepository userStarterPageRepository;

    @Autowired
    public UserStarterPageController(UserStarterPageService userStarterPageService, UserStarterPageRepository userStarterPageRepository) {
        this.userStarterPageService = userStarterPageService;
        this.userStarterPageRepository = userStarterPageRepository;
    }

    @GetMapping("/api/users/{id}/userStarterPage/test")
    public ArrayList<String> getUserStarterPageById(@PathVariable(value = "id") Long id) {
        return userStarterPageRepository.getStatusesByUserId(id);
    }

    @GetMapping("/api/users/{id}/userStarterPage")
    public List<UserStarterPage> getUserStarterPageById1(@PathVariable(value = "id") Long id) {
        return userStarterPageRepository.findByUserId(id);
    }

    @PostMapping("/api/users/{id}/userStarterPage/create")
    public UserStarterPage createUserStarterPage(@PathVariable (value = "id") Long id, @Valid @RequestBody UserStarterPage userStarterPage) {
        return userStarterPageService.createUserStarterPage(id, userStarterPage);
    }

    @DeleteMapping("/api/users/{id}/userStarterPage/{userStarterPageId}/delete")
    public ResponseEntity<?> deleteUserStarterPage(@PathVariable (value = "id") Long id, @PathVariable (value = "userStarterPageId") Long userStarterPageId) {
        return userStarterPageService.deleteUserStarterPage(id, userStarterPageId);
    }

    @PutMapping("/api/users/{id}/userStarterPage/{userStarterPageId}/edit")
    public UserStarterPage updateUserStarterPage(@PathVariable (value = "id") Long id, @PathVariable (value = "userStarterPageId") Long userStarterPageId, @Valid @RequestBody UserStarterPage userStarterPageRequest) {
        return userStarterPageService.updateUserStarterPage(id, userStarterPageId, userStarterPageRequest);
    }


}
