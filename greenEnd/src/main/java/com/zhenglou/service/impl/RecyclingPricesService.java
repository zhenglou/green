package com.zhenglou.service.impl;

import com.zhenglou.mapper.RecyclingPricesMapper;
import com.zhenglou.pojo.RecyClingPrice;
import com.zhenglou.service.RecyclingPricesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class RecyclingPricesService implements RecyclingPricesImpl {
    @Autowired
    private RecyclingPricesMapper recyclingPricesMapper;
    @Override
    public int insert(RecyClingPrice recyClingPrice) {
        return recyclingPricesMapper.insert(recyClingPrice);
    }

    @Override
    public int delete(int id) {
        return recyclingPricesMapper.delete(id);
    }

    @Override
    public int update(RecyClingPrice recyClingPrice) {
        return recyclingPricesMapper.update(recyClingPrice);
    }

    @Override
    public List<RecyClingPrice> selectAll() {
        return recyclingPricesMapper.selectAll();
    }

    @Override
    public List<RecyClingPrice> selectByWasteName(String wasteName) {
        return recyclingPricesMapper.selectByWasteName(wasteName);
    }

    @Override
    public List<RecyClingPrice> selectByPage(int page) {
        return recyclingPricesMapper.selectByPage(page);
    }

    @Override
    public List<RecyClingPrice> selectAllWasteName() {
        return recyclingPricesMapper.selectAllWasteName();
    }
}
