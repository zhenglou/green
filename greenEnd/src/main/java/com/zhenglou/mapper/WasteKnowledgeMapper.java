package com.zhenglou.mapper;


import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface WasteKnowledgeMapper {
    @Insert("INSERT into waste_knowledge(wasteType, description, examples) VALUES (#{wasteType}, #{description}, #{examples})")
    int insert(WasteKnowledge wasteKnowledge);

    @Delete("DELETE FROM waste_knowledge WHERE wasteId= #{id}")
    int delete(int id);

    @Update("UPDATE waste_knowledge " +
            "SET wasteType = #{wasteType}, " +
            "description = #{description}, " +
            "examples = #{examples} " +
            "WHERE wasteId = #{wasteId}")
    int update(WasteKnowledge wasteKnowledge);

    @Select("select * from waste_knowledge")
    List<WasteKnowledge> selectAll();

    @Select("select * from waste_knowledge where wasteType = #{wasteType}")
    WasteKnowledge selectByWasteType(String wasteType);

    @Select("select * from waste_knowledge limit 10 offset ${(page-1) * 10};")
    List<WasteKnowledge> selectByPage(int page);
}
