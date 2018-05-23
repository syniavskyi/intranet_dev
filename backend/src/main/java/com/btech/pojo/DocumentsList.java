package com.btech.pojo;

import javax.persistence.*;

@Entity
@Table(name="documents_list")
public class DocumentsList {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="doc_id")
    private String doc_id;
    @Column(name="doc_title")
    private String title;
    @Column(name="doc_description")
    private String description;
    @Column(name="doc_language")
    private String language;
    @Column(name="doc_link")
    private String link;
    @Column(name="doc_format")
    private String format;

    public DocumentsList(String doc_id, String title, String description, String language, String link, String format) {
        this.doc_id = doc_id;
        this.title = title;
        this.description = description;
        this.language = language;
        this.link = link;
        this.format = format;
    }

    public DocumentsList() {}

    public String getDoc_id() {
        return doc_id;
    }

    public void setDoc_id(String doc_id) {
        this.doc_id = doc_id;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }
}
