package com.btech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btech.pojo.RolesList;
import com.btech.repositories.RolesRepository;

@Service
public class RolesListService {
	
	private final RolesRepository rolesRepository;
	
	@Autowired
	public RolesListService(RolesRepository rolesRepository) {
		this.rolesRepository = rolesRepository;
	}

    public List<RolesList> getAllRoles() {
        return rolesRepository.findAll();
    }
}
