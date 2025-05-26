package com.zhenglou.pojo;

import lombok.*;

@Setter
@Getter
public class IncrementRequest {
    private String metricType;
    private String date;
    private int increment;

}