package com.btech.model;

public class File {
	
	private String fileName;
    private String fileDownloadUri;

    public File(String fileName, String fileDownloadUri) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
    }

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileDownloadUri() {
		return fileDownloadUri;
	}

	public void setFileDownloadUri(String fileDownloadUri) {
		this.fileDownloadUri = fileDownloadUri;
	}

}
