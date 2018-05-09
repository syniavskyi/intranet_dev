package com.btech.pojo;


public class Error {
	
	private int error_id;
	private String error_text;
	private String access_token_path;
	
	public Error(int error_id, String error_text, String access_token_path) {
		this.error_id = error_id;
		this.error_text = error_text;
		this.access_token_path = access_token_path;
	}
	
	public Error(int error_id, String error_text) {
		this.error_id = error_id;
		this.error_text = error_text;
	}
	
	public Error() {
		
	}

	public int getError_id() {
		return error_id;
	}

	public void setError_id(int error_id) {
		this.error_id = error_id;
	}

	public String getError_text() {
		return error_text;
	}

	public void setError_text(String error_text) {
		this.error_text = error_text;
	}

	public String getAccess_token_path() {
		return access_token_path;
	}

	public void setAccess_token_path(String access_token_path) {
		this.access_token_path = access_token_path;
	}
	
}
