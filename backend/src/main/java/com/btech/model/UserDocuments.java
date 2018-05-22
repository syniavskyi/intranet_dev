package com.btech.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="users_documents")
public class UserDocuments {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="doc_title")
    private String title;
    @Column(name="doc_description")
    private String description;
    @Column(name="doc_language")
    private String lang;
    @Column(name="doc_link")
    private String link;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    @JsonIgnore
    private User user;

    public UserDocuments() {}

    public UserDocuments(String title, String description, String lang, String link) {
        this.title = title;
        this.description = description;
        this.lang = lang;
        this.link = link;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserDocuments{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", lang='" + lang + '\'' +
                ", link='" + link + '\'' +
                ", user=" + user +
                '}';
    }
}

