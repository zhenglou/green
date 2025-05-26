package com.zhenglou.controller;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.impl.EnvironmentalKnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/envKnow")
public class EnvironmentalKnowledgeController {
    @Autowired
    private EnvironmentalKnowledgeService environmentalKnowledgeService;
    @PostMapping("/insert")
    public int insert(@RequestBody EnvironmentalKnowledge environmentalKnowledge) {
        return environmentalKnowledgeService.insert(environmentalKnowledge);
    }
    @PostMapping("/update")
    public int update(@RequestBody EnvironmentalKnowledge environmentalKnowledge) {
        return environmentalKnowledgeService.update(environmentalKnowledge);
    }
    @PostMapping("/delete")
    public int delete(@RequestParam int id) {
        return environmentalKnowledgeService.delete(id);
    }
    @GetMapping("/selectOne")
    public EnvironmentalKnowledge selectByOne(String title) {
        return environmentalKnowledgeService.selectByOne(title);
    }
    @GetMapping("/selectAll")
    public List<EnvironmentalKnowledge> selectAll() {
        return environmentalKnowledgeService.selectAll();
    }
    @GetMapping("/selectByPage")
    public List<EnvironmentalKnowledge> selectByPage(@RequestParam int page) {
        return environmentalKnowledgeService.selectByPage(page);
    }
}
