package com.example.mybatis.service;

import com.example.mybatis.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@PropertySource(value = "classpath:application.properties")
class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    void find() {
        userService.find(new User(1, "name"));
        userService.find(new User(1));
        userService.find(new User("name"));
    }

    @Test
    void updateById() {
        userService.updateById(new User(1, "name update"));
    }

    @Test
    void insert() {
        userService.insert(new User(1, "name insert"));
    }

    @Test
    void delete() {
        userService.delete(new User(1, "name delete 1"));
        userService.delete(new User(1));
        userService.delete(new User("name delete 2"));
    }
}