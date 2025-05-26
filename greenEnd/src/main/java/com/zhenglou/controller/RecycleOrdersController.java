package com.zhenglou.controller;

import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.pojo.RecycleOrders;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.ProductOrdersService;
import com.zhenglou.service.impl.RecycleOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recOrd")
public class RecycleOrdersController {
    @Autowired
    private RecycleOrdersService recycleOrdersService;

    @PostMapping("/insert")
    public int insert(@RequestBody RecycleOrders recycleOrders) {
        return recycleOrdersService.insert(recycleOrders);
    }

    @PostMapping("/update")
    public int update(@RequestBody RecycleOrders recycleOrders) {
        return recycleOrdersService.update(recycleOrders);
    }

    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return recycleOrdersService.delete(id);
    }

    @GetMapping("/selectById")
    public RecycleOrders selectById(int id) {
        return recycleOrdersService.selectById(id);
    }

    @GetMapping("/selectAll")
    public List<RecycleOrders> selectAll() {
        return recycleOrdersService.selectAll();
    }

    @GetMapping("/selectByUserId")
    public List<RecycleOrders> selectAll(int id) {
        return recycleOrdersService.selectByUserId(id);
    }

    @GetMapping("/selectByIdAndStatus")
    public List<RecycleOrders> selectByIdAndStatus(RecycleOrders recycleOrders) {
        return recycleOrdersService.selectByIdAndStatus(recycleOrders);
    }

    @GetMapping("/selectByWorkIdAndStatus")
    public List<RecycleOrders> selectByWorkIdAndStatus(RecycleOrders recycleOrders) {
        return recycleOrdersService.selectByWorkIdAndStatus(recycleOrders);
    }

    @GetMapping("/selectByPage")
    public List<RecycleOrders> selectByPage(@RequestParam int page) {
        return recycleOrdersService.selectByPage(page);
    }
}
