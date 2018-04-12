package com.btech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btech.model.RolesList;
import com.btech.repositories.RolesRepository;

@Service
public class RolesListService {
	
	@Autowired
    private RolesRepository rolesRepository;

    public List<RolesList> getAllRoles() {
        return rolesRepository.findAll();
    }
}
