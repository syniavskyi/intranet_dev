package com.btech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.pojo.DepsList;

public interface DepsRepository extends JpaRepository<DepsList, String> {

}
