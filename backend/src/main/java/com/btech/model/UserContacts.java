package com.btech.model;

import javax.persistence.*;

@Entity(name="UserContacts")
@Table(name="user_contacts")
public class UserContacts {

    @Id
    @GeneratedValue
    @Column(name="id")
    private Long id;
    @Column(name="address")
    private String address;
    @Column(name="email")
    private String email;
    @Column(name="phone")
    private String phone;
    @Column(name="skype_id")
    private String skypeId;
    @Column(name="slack_id")
    private String slackId;

    public UserContacts() {}

    public UserContacts(String address, String email, String phone, String skypeId, String slackId) {
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.skypeId = skypeId;
        this.slackId = slackId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSkypeId() {
        return skypeId;
    }

    public void setSkypeId(String skypeId) {
        this.skypeId = skypeId;
    }

    public String getSlackId() {
        return slackId;
    }

    public void setSlackId(String slackId) {
        this.slackId = slackId;
    }
}
