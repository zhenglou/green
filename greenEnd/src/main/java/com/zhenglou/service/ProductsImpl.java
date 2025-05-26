package com.zhenglou.service;

import com.zhenglou.mapper.ProductsMapper;
import com.zhenglou.pojo.Products;
import org.springframework.stereotype.Component;

import java.util.List;

public interface ProductsImpl {
    int insert(Products products);
    int delete(int id);
    int update(Products products);
    List<Products> selectAll();
    Products selectOne(String name);
    Products selectById(Products products);
    List<Products> selectByPage(int page);
}
