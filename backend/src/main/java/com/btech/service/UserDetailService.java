package com.btech.service;

import com.btech.model.UserDetail;
import com.btech.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Service
public class UserDetailService {

    private final UserDetailsRepository userDetailsRepository;

    @Autowired
    public UserDetailService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public UserDetail getUserDetailById(Long id) {
        return userDetailsRepository.findById(id);
    }

    public Long calculateSeniority(Long id) throws ParseException {
        UserDetail ud = userDetailsRepository.findById(id);
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy", Locale.ENGLISH);
        String date = sdf.format(new Date());
        Date todayDate = sdf.parse(date);
        Date employmentDate = sdf.parse(ud.getEmploymentDate());

        long diffInMillies = Math.abs(todayDate.getTime() - employmentDate.getTime());
        long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        return diff;
    }

    public Long updateDetail(Long id, String branch, String section, String position, String currentProject, String state, String employmentDate) throws ParseException {
        UserDetail ud = userDetailsRepository.findById(id);
        ud.setBranch(branch);
        ud.setSection(section);
        ud.setPosition(position);
        ud.setCurrentProject(currentProject);
        ud.setState(state);
        ud.setEmploymentDate(employmentDate);
        ud.setSeniority(calculateSeniority(id));
        userDetailsRepository.save(ud);
        return ud.getSeniority();
    }
}
