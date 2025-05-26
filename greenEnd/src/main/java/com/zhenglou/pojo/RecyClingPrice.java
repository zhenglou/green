package com.zhenglou.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecyClingPrice {
    private int recyPricId;
    private String wasteName;
    private String price;
    private String description;
    private Date createTime;
}
