package com.btech.controllers;

import com.btech.model.UserDetail;
import com.btech.repositories.UserDetailsRepository;
import com.btech.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
public class UserDetailController {

    private final UserDetailService userDetailService;
    private final UserDetailsRepository userDetailsRepository;

    @Autowired
    public UserDetailController(UserDetailService userDetailService, UserDetailsRepository userDetailsRepository) {
        this.userDetailService = userDetailService;
        this.userDetailsRepository = userDetailsRepository;
    }

    @CrossOrigin
    @RequestMapping(value = "/api/user/edit/detail", method = RequestMethod.POST)
    public Long changeDetail(@RequestParam(value = "id") Long id,
                             @RequestParam(value = "branch", required = false) String branch,
                             @RequestParam(value = "section", required = false) String section,
                             @RequestParam(value = "position", required = false) String position,
                             @RequestParam(value = "currentProject", required = false) String currentProject,
                             @RequestParam(value = "state", required = false) String state,
                             @RequestParam(value = "employmentDate", required = false) String employmentDate) throws ParseException {
        return userDetailService.updateDetail(id, branch, section, position, currentProject, state, employmentDate);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/users/userDetail/{id}", method = RequestMethod.GET)
    public UserDetail getUserDetailById(@PathVariable Long id) throws ParseException {
        UserDetail ud = userDetailsRepository.findById(id);
        ud.setSeniority(userDetailService.calculateSeniority(id));
        return userDetailService.getUserDetailById(id);
    }
}
