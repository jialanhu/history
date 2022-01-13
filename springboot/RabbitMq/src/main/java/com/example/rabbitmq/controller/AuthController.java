package com.example.rabbitmq.controller;

import com.example.rabbitmq.model.User;
import com.example.rabbitmq.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    MessageService messageService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        messageService.sendLoginUser(user);
        return "登录成功";
    }
}
