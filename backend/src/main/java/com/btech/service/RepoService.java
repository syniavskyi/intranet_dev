package com.btech.service;

import com.btech.pojo.DepsList;
import com.btech.pojo.RolesList;
import com.btech.repositories.DepsRepository;
import com.btech.repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepoService {

    private final DepsRepository depsRepository;
    private final RolesRepository rolesRepository;

    @Autowired
    public RepoService(DepsRepository depsRepository, RolesRepository rolesRepository) {
        this.depsRepository = depsRepository;
        this.rolesRepository = rolesRepository;
    }

    public List<DepsList> getAllDeps() {
        return depsRepository.findAll();
    }
    public List<RolesList> getAllRoles() {
        return rolesRepository.findAll();
    }
}
