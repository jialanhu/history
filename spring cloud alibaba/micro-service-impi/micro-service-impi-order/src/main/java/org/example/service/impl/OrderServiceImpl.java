package org.example.service.impl;

import org.example.service.api.OrderService;
import org.example.service.openfeign.UserServiceFeign;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderServiceImpl implements OrderService {
    @Autowired
    private UserServiceFeign userServiceFeign;
    @Override
    public String getOrder(Integer orderId) {
        return "订单编号 :" + orderId + "\n" + userServiceFeign.getUser(orderId);
    }
}
