package com.btech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.model.RolesList;

public interface RolesRepository extends JpaRepository<RolesList, Long> {

	
}
