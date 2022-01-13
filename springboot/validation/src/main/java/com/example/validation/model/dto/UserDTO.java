package com.example.validation.model.dto;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserDTO {

    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "名字只能是字母或数字")
    @NotNull(message = "名字不能为空")
    @Length(min = 6, max = 64, message = "名字字符大小必须在6~64之间")
    private String name;

    @NotNull(message = "电子邮箱地址不能为空")
    @Email(message = "必须是电子邮箱地址")
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
