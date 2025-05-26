package com.zhenglou.service;

import com.zhenglou.mapper.RecycleOrdersMapper;
import com.zhenglou.pojo.RecycleOrders;
import org.springframework.stereotype.Component;

import java.util.List;

public interface RecycleOrdersImpl {
    int insert(RecycleOrders record);
    int delete(int id);
    int update(RecycleOrders record);
    List<RecycleOrders> selectAll();
    RecycleOrders selectById(int orderId);
    List<RecycleOrders> selectByUserId(int userId);
    List<RecycleOrders> selectByPage(int page);
    List<RecycleOrders> selectByIdAndStatus(RecycleOrders record);
    List<RecycleOrders> selectByWorkIdAndStatus(RecycleOrders record);
}
