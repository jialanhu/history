package org.example.service.openfeign;

import org.example.service.api.UserService;
import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("User-Service")
public interface UserServiceFeign extends UserService {
}
