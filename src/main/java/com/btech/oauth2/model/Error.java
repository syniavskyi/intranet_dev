package com.btech.oauth2.model;


public class Error {
	
	private int errorID;
	private String errorText;
	private String accessTokenPath;
	
	public Error(int errorID, String errorText, String accessTokenPath) {
		this.errorID = errorID;
		this.errorText = errorText;
		this.accessTokenPath = accessTokenPath;
	}
	
	public Error(int errorID, String errorText) {
		this.errorID = errorID;
		this.errorText = errorText;
	}
	
	public Error() {
		
	}
	
	public int getErrorID() {
		return errorID;
	}

	public void setErrorID(int errorID) {
		this.errorID = errorID;
	}

	public String getErrorText() {
		return errorText;
	}

	public void setErrorText(String errorText) {
		this.errorText = errorText;
	}

	public String getAccessTokenPath() {
		return accessTokenPath;
	}

	public void setAccessTokenPath(String accessTokenPath) {
		this.accessTokenPath = accessTokenPath;
	}
	
}
