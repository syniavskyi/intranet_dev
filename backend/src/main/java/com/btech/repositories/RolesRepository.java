package com.btech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.btech.pojo.RolesList;

public interface RolesRepository extends JpaRepository<RolesList, String> {

}
