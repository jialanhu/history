package com.example.response.utils;

public class Response <T>{
    // 业务错误码
    private Integer err;

    // 数据
    private T data;

    // 提示信息
    private String message;

    public Response(){
        this.err = 0;
        this.message = "请求成功";
    }

    public Response(T data) {
        this();
        this.data = data;
    }

    public Integer getErr() {
        return err;
    }

    public void setErr(Integer err) {
        this.err = err;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
