package com.btech.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="user_engag")
public class UserEngag {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @NotNull
    @Column(name="start_date")
    private String startDate;
    @NotNull
    @Column(name="end_date")
    private String endDate;
    @NotNull
    @Lob
    @Column(name="engag")
    private String engag;
    @NotNull
    @Column(name="proj_id")
    private int projId;
    @NotNull
    @Column(name="contractor_id")
    private int contractorId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    public UserEngag() {}

    public UserEngag(String startDate, String endDate, String engag, int projId, int contractorId) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.engag = engag;
        this.projId = projId;
        this.contractorId = contractorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getEngag() {
        return engag;
    }

    public void setEngag(String engag) {
        this.engag = engag;
    }

    public int getProjId() {
        return projId;
    }

    public void setProjId(int projId) {
        this.projId = projId;
    }

    public int getContractorId() {
        return contractorId;
    }

    public void setContractorId(int contractorId) {
        this.contractorId = contractorId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
