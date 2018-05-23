package com.btech.service;

import com.btech.exceptions.CustomResourceNotFoundException;
import com.btech.model.UserEngag;
import com.btech.repositories.UserEngagRepository;
import com.btech.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserEngagService {

    private final UserEngagRepository userEngagRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserEngagService(UserEngagRepository userEngagRepository, UserRepository userRepository) {
        this.userEngagRepository = userEngagRepository;
        this.userRepository = userRepository;
    }

    public UserEngag createUserEngag(Long id, UserEngag userEngag) {
        return userRepository.findById(id).map(user -> {
            userEngag.setUser(user);
            return userEngagRepository.save(userEngag);
        }).orElseThrow(() -> new CustomResourceNotFoundException("Id " + id + " not found"));
    }

    public ResponseEntity<?> deleteUserEngag(Long id, Long userEngagId) {
        if(!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("Id " + id + " not found");
        }
        return userEngagRepository.findById(userEngagId).map(userEngag -> {
            userEngagRepository.delete(userEngag);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserId " + userEngagId + " not found"));
    }

    public UserEngag updateUserEngag(Long id, Long userEngagId, UserEngag userEngagRequest) {
        if (!userRepository.existsById(id)) {
            throw new CustomResourceNotFoundException("UserId " + id + " not found");
        }
        return userEngagRepository.findById(userEngagId).map(userEngag -> {
            userEngag.setStartDate(userEngagRequest.getStartDate());
            userEngag.setEndDate(userEngagRequest.getEndDate());
            userEngag.setEngag(userEngagRequest.getEngag());
            userEngag.setProjId(userEngagRequest.getProjId());
            userEngag.setContractorId(userEngagRequest.getContractorId());
            return userEngagRepository.save(userEngag);
        }).orElseThrow(() -> new CustomResourceNotFoundException("UserEngagId " + userEngagId + "not found"));
    }
}
