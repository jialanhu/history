package com.example.rabbitmq.service;

import com.example.rabbitmq.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageService {
    private final static String LOGIN_EXCHANGE_NAME = "user";
    private final static String LOGIN_ROUTEING_NAME = "user.login";
    private final static String LOGIN_QUEUE_NAME = "login";

    @Autowired
    RabbitTemplate rabbitTemplate;

    public void sendLoginUser(User user) {
        /**
         * 发送消息时，使用convertAndSend(exchange, routingKey, message)可以指定Exchange、Routing Key以及消息本身。
         * 这里传入JavaBean后会自动序列化为JSON文本。
         */
        rabbitTemplate.convertAndSend(LOGIN_EXCHANGE_NAME, LOGIN_ROUTEING_NAME, user);
    }

    final Logger logger = LoggerFactory.getLogger(getClass());

    // 接收消息时，需要在消息处理的方法上标注@RabbitListener：
    @RabbitListener(queues = LOGIN_QUEUE_NAME)
    public void onRegistrationMessageFromMailQueue(User user) throws Exception {
        logger.info("queue {} received LoginUser message: {}", LOGIN_QUEUE_NAME, user.toString());
    }

}
