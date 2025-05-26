package com.zhenglou.pojo;

public class DailyMetric
{
    private String date; // 日期
    private String metricType; // 指标类型
    private int value; // 统计值

    // Getters and Setters
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMetricType() {
        return metricType;
    }

    public void setMetricType(String metricType) {
        this.metricType = metricType;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
