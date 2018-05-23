package com.btech.service;

import com.btech.pojo.*;
import com.btech.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepoService {

    private final DepsRepository depsRepository;
    private final RolesRepository rolesRepository;
    private final SectionListRepository sectionListRepository;
    private final ProjectListRepository projectListRepository;
    private final ContractorListRepository contractorListRepository;
    private final DocumentsListRepository documentsListRepository;

    @Autowired
    public RepoService(DepsRepository depsRepository,
                       RolesRepository rolesRepository,
                       SectionListRepository sectionListRepository,
                       ProjectListRepository projectListRepository,
                       ContractorListRepository contractorListRepository,
                       DocumentsListRepository documentsListRepository) {
        this.depsRepository = depsRepository;
        this.rolesRepository = rolesRepository;
        this.sectionListRepository = sectionListRepository;
        this.projectListRepository = projectListRepository;
        this.contractorListRepository = contractorListRepository;
        this.documentsListRepository = documentsListRepository;
    }

    public List<DepsList> getAllDeps() {
        return depsRepository.findAll();
    }
    public List<RolesList> getAllRoles() {
        return rolesRepository.findAll();
    }
    public List<SectionList> getAllSections() {
        return sectionListRepository.findAll();
    }
    public List<ProjectList> getAllProjects() {
        return projectListRepository.findAll();
    }
    public List<ContractorList> getAllContractors() {
        return contractorListRepository.findAll();
    }
    public List<DocumentsList> getAllDocuments() {
        return documentsListRepository.findAll();
    }

}
