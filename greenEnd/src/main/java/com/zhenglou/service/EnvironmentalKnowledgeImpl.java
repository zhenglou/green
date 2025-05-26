package com.zhenglou.service;

import com.zhenglou.pojo.EnvironmentalKnowledge;
import org.springframework.stereotype.Component;

import java.util.List;


public interface EnvironmentalKnowledgeImpl {
    int insert(EnvironmentalKnowledge environmentalKnowledge);
    int delete(int id);
    int update(EnvironmentalKnowledge environmentalKnowledge);
    List<EnvironmentalKnowledge> selectAll();
    EnvironmentalKnowledge selectByOne(String title);
    List<EnvironmentalKnowledge> selectByPage(int page);
}
