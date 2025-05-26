package com.zhenglou.service.impl;

import com.zhenglou.mapper.ProductOrdersMapper;
import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.service.ProductOrdersImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProductOrdersService implements ProductOrdersImpl {
    @Autowired
    private ProductOrdersMapper productOrdersMapper;
    @Override
    public int insert(ProductOrders productOrders) {
        return productOrdersMapper.insert(productOrders);
    }

    @Override
    public int delete(int id) {
        return productOrdersMapper.delete(id);
    }

    @Override
    public int update(ProductOrders productOrders) {
        return productOrdersMapper.update(productOrders);
    }

    @Override
    public List<ProductOrders> selectAll() {
        return productOrdersMapper.selectAll();
    }

    @Override
    public List<ProductOrders> selectByUserId(int userId) {
        return productOrdersMapper.selectByUserId(userId);
    }

    @Override
    public ProductOrders selectById(int orderId) {
        return productOrdersMapper.selectById(orderId);
    }

    @Override
    public List<ProductOrders> selectByPage(int page) {
        return productOrdersMapper.selectByPage(page);
    }

    @Override
    public List<ProductOrders> selectByIdAndStatus(ProductOrders productOrders) {
        return productOrdersMapper.selectByIdAndStatus(productOrders);
    }
}
