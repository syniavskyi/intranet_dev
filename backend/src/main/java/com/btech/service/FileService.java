package com.btech.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.btech.model.UserDetail;
import com.btech.model.UserInfo;
import com.btech.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.btech.model.File;
import com.btech.repositories.UserInfoRepository;

@Service
public class FileService {
	
	private final FileStorageService fileStorageService;
	private final UserInfoRepository userInfoRepository;
	private final UserDetailsRepository userDetailsRepository;
	
	@Autowired
	public FileService(FileStorageService fileStorageService, UserInfoRepository userInfoRepository, UserDetailsRepository userDetailsRepository) {
		this.fileStorageService = fileStorageService;
		this.userInfoRepository = userInfoRepository;
		this.userDetailsRepository = userDetailsRepository;
	}
	
    public File uploadImage(MultipartFile file, @RequestParam("id") Long id) {
        String fileName = fileStorageService.storeFile(file, "image");
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/files/downloadImage/").path(fileName).toUriString();
        UserInfo ui = userInfoRepository.findById(id);
		ui.setImage(fileDownloadUri);
		userInfoRepository.save(ui);
        return new File(fileName, fileDownloadUri);
    }

    public File uploadFile(MultipartFile file, @RequestParam("id") Long id) {
	    String fileName = fileStorageService.storeFile(file, "file");
	    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/files/downloadFile/").path(fileName).toUriString();
        UserDetail ud = userDetailsRepository.findById(id);
        ud.setCv(fileDownloadUri);
        userDetailsRepository.save(ud);
        return new File(fileName, fileDownloadUri);
    }
    
    public ResponseEntity<Resource> downloadFile(String fileName, HttpServletRequest request, String type) {
        Resource resource = fileStorageService.loadFileAsResource(fileName, type);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
