package org.example.service.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/orders")
public interface OrderService {
    @GetMapping("/{id}")
    String getOrder(@PathVariable("id") Integer orderId);
}
