package org.example.service.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/users")
public interface UserService {
    @GetMapping("/{id}")
    String getUser(@PathVariable("id") Integer userId);
}
