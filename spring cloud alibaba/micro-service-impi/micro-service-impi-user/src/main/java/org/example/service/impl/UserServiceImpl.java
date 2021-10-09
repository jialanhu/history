package org.example.service.impl;

import org.example.service.api.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class UserServiceImpl implements UserService {
    @Value("${microname}")
    private String name;

    @Override
    public String getUser(Integer userId) {
        System.out.println("getUser Function");
        return  "用户的id: " + userId + " name" + name;
    }
}
