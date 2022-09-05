package com.example.mybatisplus.controller;

import com.example.mybatisplus.mybatis.entity.User;
import com.example.mybatisplus.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserServiceImpl userService;

    @GetMapping
    public List<User> list() {
        return userService.list();
    }

    @PostMapping
    public Boolean save(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public Boolean update(@RequestBody User user, @PathVariable Integer id) {
        user.setId(id);
        return userService.updateById(user);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @DeleteMapping("/{id}")
    public Boolean remove(@PathVariable Integer id) {
        return userService.removeById(id);
    }
}
