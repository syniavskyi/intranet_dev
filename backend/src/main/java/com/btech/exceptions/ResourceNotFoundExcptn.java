package com.btech.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundExcptn extends RuntimeException {
    public ResourceNotFoundExcptn() {
        super();
    }

    public ResourceNotFoundExcptn(String message) {
        super(message);
    }

    public ResourceNotFoundExcptn(String message, Throwable cause) {
        super(message, cause);
    }
}