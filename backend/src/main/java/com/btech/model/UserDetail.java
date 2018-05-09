package com.btech.model;

import javax.persistence.*;

@Entity(name="UserDetail")
@Table(name="user_details")
public class UserDetail {

    @Id
    @GeneratedValue
    private Long id;
    @Column(name="branch")
    private String branch;
    @Column(name="section")
    private String section;
    @Column(name="position")
    private String position;
    @Column(name="current_project")
    private String currentProject;
    @Column(name="state")
    private String state;
    @Column(name="employment_date")
    private String employmentDate;
    @Column(name="seniority")
    private Long seniority;
    @Column(name="cv")
    private String cv;

    private UserDetail() {}

    private UserDetail(String branch, String section, String position, String currentProject, String state, String employmentDate, Long seniority, String cv) {
        this.branch = branch;
        this.section = section;
        this.position = position;
        this.currentProject = currentProject;
        this.state = state;
        this.employmentDate = employmentDate;
        this.seniority = seniority;
        this.cv = cv;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getCurrentProject() {
        return currentProject;
    }

    public void setCurrentProject(String currentProject) {
        this.currentProject = currentProject;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getEmploymentDate() {
        return employmentDate;
    }

    public void setEmploymentDate(String employmentDate) {
        this.employmentDate = employmentDate;
    }

    public Long getSeniority() {
        return seniority;
    }

    public void setSeniority(Long seniority) {
        this.seniority = seniority;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }
}
