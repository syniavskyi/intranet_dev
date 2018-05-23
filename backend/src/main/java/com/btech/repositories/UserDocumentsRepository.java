package com.btech.repositories;


import com.btech.model.UserDocuments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDocumentsRepository extends JpaRepository<UserDocuments, Long>{

    List<UserDocuments> findByUserId(Long id);
    Optional<UserDocuments> findById(Long id);

}
