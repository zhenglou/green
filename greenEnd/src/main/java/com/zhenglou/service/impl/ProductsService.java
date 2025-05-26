package com.zhenglou.service.impl;

import com.zhenglou.mapper.ProductsMapper;
import com.zhenglou.pojo.Products;
import com.zhenglou.service.ProductsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProductsService implements ProductsImpl {
    @Autowired
    private ProductsMapper productsMapper;
    @Override
    public int insert(Products products) {
        return productsMapper.insert(products);
    }

    @Override
    public int delete(int id) {
        return productsMapper.delete(id);
    }

    @Override
    public int update(Products products) {
        return productsMapper.update(products);
    }

    @Override
    public List<Products> selectAll() {
        return productsMapper.selectAll();
    }

    @Override
    public Products selectOne(String name) {
        return productsMapper.selectOne(name);
    }

    @Override
    public Products selectById(Products products) {
        return productsMapper.selectById(products);
    }

    @Override
    public List<Products> selectByPage(int page) {
        return productsMapper.selectByPage(page);
    }
}
