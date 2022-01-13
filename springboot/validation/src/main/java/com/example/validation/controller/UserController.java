package com.example.validation.controller;

import com.example.validation.model.dto.UserDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    @PostMapping()
    public String createUser (@Valid @RequestBody UserDTO userDTO) {
        return "请求成功";
    }
}
