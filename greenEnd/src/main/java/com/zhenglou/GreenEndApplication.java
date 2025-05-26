package com.zhenglou;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
//@MapperScan("com.zhenglou.testMapper.mapper")
@SpringBootApplication
public class GreenEndApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenEndApplication.class, args);
    }

}
