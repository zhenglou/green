package com.zhenglou.service.impl;

import com.zhenglou.mapper.EnvironmentalKnowledgeMapper;
import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.service.EnvironmentalKnowledgeImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class EnvironmentalKnowledgeService implements EnvironmentalKnowledgeImpl {
    @Autowired
    EnvironmentalKnowledgeMapper environmentalKnowledgeMapper;
    @Override
    public int insert(EnvironmentalKnowledge environmentalKnowledge) {
        return environmentalKnowledgeMapper.insert(environmentalKnowledge);
    }

    @Override
    public int delete(int id) {
        return environmentalKnowledgeMapper.delete(id);
    }

    @Override
    public int update(EnvironmentalKnowledge environmentalKnowledge) {
        return environmentalKnowledgeMapper.update(environmentalKnowledge);
    }

    @Override
    public List<EnvironmentalKnowledge> selectAll() {
        return environmentalKnowledgeMapper.selectAll();
    }

    @Override
    public EnvironmentalKnowledge selectByOne(String title) {
        return environmentalKnowledgeMapper.selectOne(title);
    }

    @Override
    public List<EnvironmentalKnowledge> selectByPage(int page) {
        return environmentalKnowledgeMapper.selectByPage(page);
    }
}
