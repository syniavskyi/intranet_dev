package com.btech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btech.pojo.DepsList;
import com.btech.repositories.DepsRepository;

@Service
public class DepsListService {
	
	private final DepsRepository depsRepository;
	
	@Autowired
	public DepsListService(DepsRepository depsRepository) {
		this.depsRepository = depsRepository;
	}
	
    public List<DepsList> getAllDeps() {
        return depsRepository.findAll();
    }
    
}
