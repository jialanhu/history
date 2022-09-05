package com.example.response.Controller;

import com.example.response.model.VO.UserVO;
import com.example.response.utils.Response;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController {
    @GetMapping("/hello")
    public Response<Object> hello () {
        return new Response<>();
    }

    @GetMapping("/{id}")
    public Response<UserVO> get (@PathVariable Integer id) {
        return new Response<>(new UserVO(id, "username"));
    }
}
