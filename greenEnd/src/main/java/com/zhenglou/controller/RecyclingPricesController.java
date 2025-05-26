package com.zhenglou.controller;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.RecyClingPrice;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.EnvironmentalKnowledgeService;
import com.zhenglou.service.impl.RecyclingPricesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/recPri")
public class RecyclingPricesController {
    @Autowired
    private RecyclingPricesService recyclingPricesService;

    @PostMapping("/insert")
    public int insert(@RequestBody RecyClingPrice recyclingPrices) {
        return recyclingPricesService.insert(recyclingPrices);
    }

    @PostMapping("/update")
    public int update(@RequestBody RecyClingPrice recyclingPrices) {
        return recyclingPricesService.update(recyclingPrices);
    }

    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return recyclingPricesService.delete(id);
    }

    @GetMapping("/selectOne")
    public List<RecyClingPrice> selectByOne(String name) {
        return recyclingPricesService.selectByWasteName(name);
    }

    @GetMapping("/selectAll")
    public List<RecyClingPrice> selectAll() {
        return recyclingPricesService.selectAll();
    }
    @GetMapping("/selectByPage")
    public List<RecyClingPrice> selectByPage(@RequestParam int page) {
        return recyclingPricesService.selectByPage(page);
    }
    @GetMapping("/selectAllWasteName")
    public List<RecyClingPrice> selectAllWasteName() {
        return recyclingPricesService.selectAllWasteName();
    }
}
