package com.btech.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CustomResourceNotFoundException extends RuntimeException {

    public CustomResourceNotFoundException() {
        super();
    }

    public CustomResourceNotFoundException(String message) {
        super(message);
    }

    public CustomResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}