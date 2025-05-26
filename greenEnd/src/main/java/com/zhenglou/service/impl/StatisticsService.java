package com.zhenglou.service.impl;

import com.zhenglou.mapper.StatisticsMapper;
import com.zhenglou.pojo.DailyMetric;
import com.zhenglou.pojo.IncrementRequest;
import com.zhenglou.pojo.MetricTypeTotal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Service
public class StatisticsService {
    @Autowired
    private StatisticsMapper statisticsMapper;

    public Map<String, List<DailyMetric>> getLast7DaysMetrics() {
        // 获取今天和7天前的日期
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(6); // 包括今天，共7天

        String startDate = sevenDaysAgo.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        String endDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // 查询数据库
        List<DailyMetric> metrics = statisticsMapper.getMetricsForDateRange(startDate, endDate);

        // 按照指标类型分组返回
        return metrics.stream()
                .collect(Collectors.groupingBy(DailyMetric::getMetricType));
    }

    public List<MetricTypeTotal> getTotalByMetricType() {
        return statisticsMapper.getTotalByMetricType();
    }


    @Transactional
    public boolean incrementValue(String metricType, LocalDate date, int increment) {
        int i = 0;
        int rowsAffected = 0;
        IncrementRequest request = new IncrementRequest();
        request.setMetricType(metricType);
        String dateStr = date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        request.setDate(dateStr);
        request.setIncrement(increment);
        Integer key = statisticsMapper.getOneMetricType(request);
        if(key == null) {
            i = statisticsMapper.insertNewM(request);
        }else{
            i = 1;
        }
        if(i == 1) {
            rowsAffected = statisticsMapper.incrementValue(metricType, date, increment);
        }
        System.out.println(i+"1231321312321213");
        return rowsAffected > 0; // 是否成功更新
    }
}
