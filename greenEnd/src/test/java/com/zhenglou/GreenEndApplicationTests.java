package com.zhenglou;

import com.zhenglou.controller.StatisticsController;
import com.zhenglou.mapper.*;
import com.zhenglou.pojo.*;
import com.zhenglou.service.impl.StatisticsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

@SpringBootTest
class GreenEndApplicationTests {
    @Autowired
    RecyclingPricesMapper recyclingPricesMapper;
    @Autowired
    EnvironmentalKnowledgeMapper environmentalKnowledgeMapper;
    @Autowired
    WasteKnowledgeMapper wasteKnowledgeMapper;
    @Autowired
    UserMapper userMapper;
    @Autowired
    StatisticsMapper statisticsMapper;
    @Autowired
    StatisticsController statisticsController;
    @Autowired
    RecycleOrdersMapper recycleOrdersMapper;
    @Test
    void contextLoads() {
    }

    @Test
    public void test() {
        User user = new User();
        user.setUserId(1);
        user.setExperience(1);
        int i = userMapper.upDateExperience(user);
        System.out.println(i);
//        Result last7DaysMetrics = statisticsController.getLast7DaysMetrics();
//        System.out.println(last7DaysMetrics);
//        List<WasteKnowledge> users = wasteKnowledgeMapper.selectByPage(1);
//        users.stream().forEach(item -> {
//            System.out.println(item);
//        });
    }

    @Test
    public void recyClingPriceList() {
//        List<RecyClingPrice> recyClingPrices = recyclingPricesMapper.selectAllWasteName();
//        List<User> allUserInfoOrderByExperience = userMapper.getAllUserInfoOrderByExperience();
        IncrementRequest incrementRequest = new IncrementRequest();
        incrementRequest.setMetricType("ai_usage");
        incrementRequest.setDate("2025-01-27");
        incrementRequest.setIncrement(3);
        String s = statisticsController.incrementValue(incrementRequest);
        System.out.println(s);
//        recycleOrders1.stream().forEach(item -> {
//            System.out.println(item);
//        });
    }
}
