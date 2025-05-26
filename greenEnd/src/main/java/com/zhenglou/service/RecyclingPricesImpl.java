package com.zhenglou.service;

import com.zhenglou.mapper.RecyclingPricesMapper;
import com.zhenglou.pojo.RecyClingPrice;

import java.util.List;

public interface RecyclingPricesImpl {
    int insert(RecyClingPrice recyClingPrice);
    int delete(int id);
    int update(RecyClingPrice recyClingPrice);
    List<RecyClingPrice> selectAll();
    List<RecyClingPrice> selectByWasteName(String wasteName);
    List<RecyClingPrice> selectByPage(int page);
    List<RecyClingPrice> selectAllWasteName();
}
