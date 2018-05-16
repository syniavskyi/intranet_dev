package com.btech.pojo;

import javax.persistence.*;

@Entity
@Table(name="contractor_list")
public class ContractorList {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="name")
    private String name;

    public ContractorList() {}

    public ContractorList(String name) {
        this.name = name;
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
}
