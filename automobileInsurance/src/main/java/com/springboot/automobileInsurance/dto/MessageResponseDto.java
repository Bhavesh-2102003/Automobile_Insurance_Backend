package com.springboot.automobileInsurance.dto;

import org.springframework.stereotype.Component;

@Component
public class MessageResponseDto {
	private String boby;
	private int statusCode;
	
	public MessageResponseDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MessageResponseDto(String boby, int statusCode) {
		super();
		this.boby = boby;
		this.statusCode = statusCode;
	}

	public String getBoby() {
		return boby;
	}

	public void setBoby(String boby) {
		this.boby = boby;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	
	

}
