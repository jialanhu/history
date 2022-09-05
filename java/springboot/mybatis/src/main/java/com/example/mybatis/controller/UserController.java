package com.example.mybatis.controller;

import com.example.mybatis.entity.User;
import com.example.mybatis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public List<User> list() {
        return userService.find(new User());
    }

    @PostMapping()
    public Boolean add(@RequestBody User user) {
        return userService.insert(user) > 0;
    }

    @PutMapping("/{id}")
    public Boolean update(@RequestBody User user, @PathVariable Integer id) {
        user.setId(id);
        return userService.updateById(user) > 0;
    }

    @DeleteMapping("/{id}")
    public Boolean deleteById(@PathVariable Integer id) {
        return userService.delete(new User(id)) > 0;
    }
}
