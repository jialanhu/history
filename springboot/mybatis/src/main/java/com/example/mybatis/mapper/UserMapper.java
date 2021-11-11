package com.example.mybatis.mapper;

import com.example.mybatis.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> find(User user);

    Integer updateById(User user);

    Integer insert(User user);

    Integer delete(User user);
}
