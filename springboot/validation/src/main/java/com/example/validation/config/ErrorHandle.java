package com.example.validation.config;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

@RestControllerAdvice
public class ErrorHandle {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String handle(MethodArgumentNotValidException e) {
        return "参数校验错误：" + Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
    }
}
