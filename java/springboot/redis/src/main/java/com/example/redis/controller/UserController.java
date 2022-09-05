package com.example.redis.controller;

import com.example.redis.entity.User;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CacheConfig(cacheNames = "USER") //同一管理缓存的前缀
public class UserController {
    private User temp;

    @PostMapping
    public User create (@RequestBody User user) {
        temp = user;
        return user;
    }

    @GetMapping("/{id}")
    @Cacheable(key = "#id") // 查找缓存,若没有，则在第一次返回时自动创建缓存 #id:取参数id 也可以使用 #result.变量名 取返回参的内容
    public User getById (@PathVariable Integer id) {
        return temp;
    }

    @PutMapping("/{id}")
    @CachePut(key = "#id")  // 不查找缓存,返回时直接设置缓存
    public User updateById (@PathVariable Integer id, @RequestBody User user) {
        temp = user;
        return user;
    }

    @DeleteMapping("/{id}")
    @CacheEvict(key = "#id")  // 清楚缓存
    public User deleteById (@PathVariable Integer id) {
        return temp;
    }
}
