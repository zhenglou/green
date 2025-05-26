package com.zhenglou.service;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.ProductOrders;
import org.springframework.stereotype.Component;

import java.util.List;


public interface ProductOrdersImpl {
    int insert(ProductOrders productOrders);
    int delete(int id);
    int update(ProductOrders productOrders);
    List<ProductOrders> selectAll();
    List<ProductOrders>  selectByUserId(int userId);
    ProductOrders selectById(int orderId);
    List<ProductOrders> selectByPage(int page);
    List<ProductOrders> selectByIdAndStatus(ProductOrders productOrders);
}
