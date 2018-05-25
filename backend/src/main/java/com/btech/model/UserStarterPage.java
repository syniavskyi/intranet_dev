package com.btech.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="user_starter_page")
public class UserStarterPage {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="user_group")
    private String userGroup;
    @Column(name="doc_id")
    private Long docId;
    @Column(name="status")
    private boolean status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    public UserStarterPage() {}

    public UserStarterPage(String userGroup, Long docId, boolean status) {
        this.userGroup = userGroup;
        this.docId = docId;
        this.status = status;
    }

    public String getUserGroup() {
        return userGroup;
    }

    public UserStarterPage setUserGroup(String userGroup) {
        this.userGroup = userGroup;
        return this;
    }

    public Long getDocId() {
        return docId;
    }

    public UserStarterPage setDocId(Long docId) {
        this.docId = docId;
        return this;
    }

    public boolean isStatus() {
        return status;
    }

    public UserStarterPage setStatus(boolean status) {
        this.status = status;
        return this;
    }

    public User getUser() {
        return user;
    }

    public UserStarterPage setUser(User user) {
        this.user = user;
        return this;
    }
}
