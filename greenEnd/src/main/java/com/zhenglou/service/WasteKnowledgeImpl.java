package com.zhenglou.service;

import com.zhenglou.pojo.WasteKnowledge;

import java.util.List;

public interface WasteKnowledgeImpl {
    int insert(WasteKnowledge wasteKnowledge);
    int delete(int id);
    int update(WasteKnowledge wasteKnowledge);
    List<WasteKnowledge> selectAll();
    WasteKnowledge selectByWasteType(String wasteType);
    List<WasteKnowledge> selectByPage(int page);
}
