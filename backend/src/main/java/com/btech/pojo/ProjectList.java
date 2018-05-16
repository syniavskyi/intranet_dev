package com.btech.pojo;

import javax.persistence.*;

@Entity
@Table(name="projects_list")
public class ProjectList {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;
    @Column(name="contractor_id")
    private Long contractorId;

    public ProjectList() {}

    public ProjectList(String name, Long contractorId) {
        this.name = name;
        this.contractorId = contractorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getContractorId() {
        return contractorId;
    }

    public void setContractorId(Long contractorId) {
        this.contractorId = contractorId;
    }
}
