package com.example.mybatis.service;

import com.example.mybatis.entity.User;

import java.util.List;

public interface UserService {
    List<User> find(User user);

    Integer updateById(User user);

    Integer insert(User user);

    Integer delete(User user);
}
