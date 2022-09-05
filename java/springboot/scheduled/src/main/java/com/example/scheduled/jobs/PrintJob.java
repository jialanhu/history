package com.example.scheduled.jobs;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PrintJob {

    @Scheduled(cron="*/2 * * * * *")
    public void printNowTime() {
        System.out.println("现在时间：" + LocalDateTime.now());
    }
}
