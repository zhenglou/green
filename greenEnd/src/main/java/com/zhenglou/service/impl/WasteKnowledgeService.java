package com.zhenglou.service.impl;

import com.zhenglou.mapper.WasteKnowledgeMapper;
import com.zhenglou.pojo.WasteKnowledge;
import com.zhenglou.service.WasteKnowledgeImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WasteKnowledgeService implements WasteKnowledgeImpl {
    @Autowired
    WasteKnowledgeMapper wasteKnowledgeMapper;
    @Override
    public int insert(WasteKnowledge wasteKnowledge) {
        return wasteKnowledgeMapper.insert(wasteKnowledge);
    }

    @Override
    public int delete(int id) {
        return wasteKnowledgeMapper.delete(id);
    }

    @Override
    public int update(WasteKnowledge wasteKnowledge) {
        return wasteKnowledgeMapper.update(wasteKnowledge);
    }

    @Override
    public List<WasteKnowledge> selectAll() {
        return wasteKnowledgeMapper.selectAll();
    }

    @Override
    public WasteKnowledge selectByWasteType(String wasteType) {
        return wasteKnowledgeMapper.selectByWasteType(wasteType);
    }

    @Override
    public List<WasteKnowledge> selectByPage(int page) {
        return wasteKnowledgeMapper.selectByPage(page);
    }
}
