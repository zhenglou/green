package com.zhenglou.controller;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.EnvironmentalKnowledgeService;
import com.zhenglou.service.impl.WasteKnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/wasKno")
public class WasteKnowledgeController {
    @Autowired
    private WasteKnowledgeService wasteKnowledgeService;
    @PostMapping("/insert")
    public int insert(@RequestBody WasteKnowledge wasteKnowledge) {
        return wasteKnowledgeService.insert(wasteKnowledge);
    }
    @PostMapping("/update")
    public int update(@RequestBody WasteKnowledge wasteKnowledge) {
        return wasteKnowledgeService.update(wasteKnowledge);
    }
    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return wasteKnowledgeService.delete(id);
    }
    @GetMapping("/selectOne")
    public WasteKnowledge selectByOne(String wasteType) {
        return wasteKnowledgeService.selectByWasteType(wasteType);
    }
    @GetMapping("/selectAll")
    public List<WasteKnowledge> selectAll() {
        return wasteKnowledgeService.selectAll();
    }
    @GetMapping("/selectByPage")
    public List<WasteKnowledge> selectByPage(@RequestParam int page) {
        return wasteKnowledgeService.selectByPage(page);
    }
}
