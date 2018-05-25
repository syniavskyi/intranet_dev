package com.btech.service;

import com.btech.exceptions.CustomResourceNotFoundException;
import com.btech.model.UserStarterPage;
import com.btech.repositories.UserRepository;
import com.btech.repositories.UserStarterPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserStarterPageService {

    private final UserRepository userRepository;
    private final UserStarterPageRepository userStarterPageRepository;

    @Autowired
    public UserStarterPageService(UserRepository userRepository, UserStarterPageRepository userStarterPageRepository) {
        this.userRepository = userRepository;
        this.userStarterPageRepository = userStarterPageRepository;
    }

    public UserStarterPage createUserStarterPage(Long id, UserStarterPage userStarterPage) {
        return userRepository.findById(id).map(user -> {
            userStarterPage.setUser(user);
            return userStarterPageRepository.save(userStarterPage);
        }).orElseThrow(() -> new CustomResourceNotFoundException("Id " + id + " not found !"));
    }

    public ResponseEntity<?> deleteUserStarterPage(Long id, Long userStarterPageId) {
        if(!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("Id " + id + " not found !");
        }
        return userStarterPageRepository.findById(userStarterPageId).map(userStarterPage -> {
            userStarterPageRepository.delete(userStarterPage);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserId " + userStarterPageId + " not found !"));
    }

    public UserStarterPage updateUserStarterPage(Long id, Long userStarterPageId, UserStarterPage userStarterPageRequest) {
        if (!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("UserId " + id + " not found !");
        }
        return userStarterPageRepository.findById(userStarterPageId).map(userStarterPage -> {
            userStarterPage.setDocId(userStarterPageRequest.getDocId());
            userStarterPage.setUserGroup(userStarterPageRequest.getUserGroup());
            userStarterPage.setStatus(userStarterPageRequest.isStatus());
            return userStarterPageRepository.save(userStarterPage);
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserStarterPageId " + userStarterPageId + "not found !"));
    }
}

