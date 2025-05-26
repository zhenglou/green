package com.zhenglou.controller;

import com.zhenglou.pojo.DailyMetric;
import com.zhenglou.pojo.IncrementRequest;
import com.zhenglou.pojo.Result;
import com.zhenglou.service.impl.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequestMapping("/statistics")
@RestController
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/last7days")
    public Result getLast7DaysMetrics() {
        return Result.success(statisticsService.getLast7DaysMetrics());
    }

    @GetMapping("/totals")
    public Result getTotalByMetricType() {
        return Result.success(statisticsService.getTotalByMetricType());
//        return statisticsService.getTotalByMetricType();
    }

    @PostMapping("increment")
    public String incrementValue(@RequestBody IncrementRequest request) {
        LocalDate targetDate = LocalDate.parse(request.getDate()); // 将日期字符串转换为 LocalDate
        boolean success = statisticsService.incrementValue(request.getMetricType(), targetDate, request.getIncrement());
        return success ? "更新成功！" : "更新失败，记录不存在。";
    }
//    @GetMapping("/statistics/last7days")
//    public Map<String, List<DailyMetric>> getLast7DaysMetrics() {
//        return statisticsService.getLast7DaysMetrics();
//    }
}
