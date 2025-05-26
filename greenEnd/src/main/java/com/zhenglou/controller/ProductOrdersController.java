package com.zhenglou.controller;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.pojo.RecycleOrders;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.ProductOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proOrd")
public class ProductOrdersController {
    @Autowired
    private ProductOrdersService productOrdersService;

    @PostMapping("/insert")
    public int insert(@RequestBody ProductOrders productOrders) {
        return productOrdersService.insert(productOrders);
    }
    @PostMapping("/update")
    public int update(@RequestBody ProductOrders productOrders) {
        return productOrdersService.update(productOrders);
    }
    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return productOrdersService.delete(id);
    }
    @GetMapping("/selectById")
    public ProductOrders selectById(int id) {
        return productOrdersService.selectById(id);
    }
    @GetMapping("/selectAll")
    public List<ProductOrders> selectAll() {
        return productOrdersService.selectAll();
    }
    @GetMapping("/selectByUserId")
    public List<ProductOrders> selectAll(int id) {
        return productOrdersService.selectByUserId(id);
    }

    @GetMapping("/selectByIdAndStatus")
    public List<ProductOrders> selectByIdAndStatus(ProductOrders productOrders) {
        return productOrdersService.selectByIdAndStatus(productOrders);
    }

    @GetMapping("/selectByPage")
    public List<ProductOrders> selectByPage(@RequestParam int page) {
        return productOrdersService.selectByPage(page);
    }
}
