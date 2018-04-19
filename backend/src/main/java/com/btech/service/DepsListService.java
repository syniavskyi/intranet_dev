package com.btech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btech.model.DepsList;
import com.btech.repositories.DepsRepository;

@Service
public class DepsListService {
	
	@Autowired
    private DepsRepository depsRepository;

    public List<DepsList> getAllDeps() {
        return depsRepository.findAll();
    }
}
