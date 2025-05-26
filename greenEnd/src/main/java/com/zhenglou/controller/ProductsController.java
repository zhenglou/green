package com.zhenglou.controller;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.pojo.Products;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.EnvironmentalKnowledgeService;
import com.zhenglou.service.impl.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/prod")
public class ProductsController {
    @Autowired
    private ProductsService productsService;
    @PostMapping("/insert")
    public int insert(@RequestBody Products products) {
        return productsService.insert(products);
    }
    @PostMapping("/update")
    public int update(@RequestBody Products products) {
        return productsService.update(products);
    }
    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return productsService.delete(id);
    }
    @GetMapping("/selectOne")
    public Products selectOne(String title) {
        return productsService.selectOne(title);
    }
    @GetMapping("/selectById")
    public Products selectById(Products products) {
        return productsService.selectById(products);
    }
    @GetMapping("/selectAll")
    public List<Products> selectAll() {
        return productsService.selectAll();
    }
    @GetMapping("/selectByPage")
    public List<Products> selectByPage(@RequestParam int page) {
        return productsService.selectByPage(page);
    }
}
