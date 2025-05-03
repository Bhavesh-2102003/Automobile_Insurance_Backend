package com.springboot.automobileInsurance.exception;

public class InvalidContactException extends Exception {


	private static final long serialVersionUID = 1L;
	
	private String message;
	
	
	public InvalidContactException(String message) {
		super();
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}


}
