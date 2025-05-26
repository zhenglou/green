package com.zhenglou.service.impl;

import com.zhenglou.mapper.RecycleOrdersMapper;
import com.zhenglou.pojo.RecycleOrders;
import com.zhenglou.service.RecycleOrdersImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class RecycleOrdersService implements RecycleOrdersImpl {
    @Autowired
    private RecycleOrdersMapper recycleOrdersMapper;
    @Override
    public int insert(RecycleOrders record) {
        return recycleOrdersMapper.insert(record);
    }

    @Override
    public int delete(int id) {
        return recycleOrdersMapper.delete(id);
    }

    @Override
    public int update(RecycleOrders record) {
        return recycleOrdersMapper.update(record);
    }

    @Override
    public List<RecycleOrders> selectAll() {
        return recycleOrdersMapper.selectAll();
    }

    @Override
    public RecycleOrders selectById(int orderId) {
        return recycleOrdersMapper.selectById(orderId);
    }

    @Override
    public List<RecycleOrders> selectByUserId(int userId) {
        return recycleOrdersMapper.selectByUserId(userId);
    }

    @Override
    public List<RecycleOrders> selectByPage(int page) {
        return recycleOrdersMapper.selectByPage(page);
    }

    @Override
    public List<RecycleOrders> selectByIdAndStatus(RecycleOrders record) {
        return recycleOrdersMapper.selectByIdAndStatus(record);
    }

    @Override
    public List<RecycleOrders> selectByWorkIdAndStatus(RecycleOrders record) {
        return recycleOrdersMapper.selectByWorkIdAndStatus(record);
    }
}
