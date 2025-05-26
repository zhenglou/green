package com.zhenglou.mapper;

import com.zhenglou.pojo.DailyMetric;
import com.zhenglou.pojo.IncrementRequest;
import com.zhenglou.pojo.MetricTypeTotal;
import org.apache.ibatis.annotations.*;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface StatisticsMapper {
    @Select("SELECT date, metricType, value " +
            "FROM daily_statistics " +
            "WHERE date >= #{startDate} AND date <= #{endDate}")
    List<DailyMetric> getMetricsForDateRange(@Param("startDate") String startDate, @Param("endDate") String endDate);

    @Select("SELECT metricType, SUM(value) AS total_value " +
            "FROM daily_statistics " +
            "GROUP BY metricType")
    List<MetricTypeTotal> getTotalByMetricType();

    @Select("select * from daily_statistics where date = #{date} and metricType = #{metricType}")
    Integer getOneMetricType(IncrementRequest incrementRequest);

    @Insert("INSERT into daily_statistics(metricType,date,value) VALUES (#{metricType}, #{date},0)")
    int insertNewM(IncrementRequest incrementRequest);
    // 更新指定日期和类型的 value 值
    @Update("UPDATE daily_statistics " +
            "SET value = value + #{increment} " +
            "WHERE metricType = #{metricType} AND date = #{date}")
    int incrementValue(@Param("metricType") String metricType,
                       @Param("date") LocalDate date,
                       @Param("increment") int increment);
}
