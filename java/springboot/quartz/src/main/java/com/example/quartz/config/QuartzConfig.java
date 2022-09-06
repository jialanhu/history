package com.example.quartz.config;

import com.example.quartz.jos.PrintJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuartzConfig {
    private static final String QUARTZ_NAME = "print_job";
    private static final String QUARTZ_GROUP = "print_job";

    @Bean
    public JobDetail jobDetail() {
        return JobBuilder.newJob(PrintJob.class)
                .withIdentity(QUARTZ_NAME, QUARTZ_GROUP)
                .storeDurably()
                .build();
    }

    @Bean
    public Trigger trigger() {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail())
                .withIdentity(QUARTZ_NAME, QUARTZ_GROUP)
                .startNow()
                .withSchedule(CronScheduleBuilder.cronSchedule("*/2 * * * * ? *"))
                .build();
    }
}
