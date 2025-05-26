package com.zhenglou.mapper;


import com.zhenglou.pojo.EnvironmentalKnowledge;
import com.zhenglou.pojo.Products;
import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface EnvironmentalKnowledgeMapper {
    @Insert("INSERT into environmental_knowledge(title, content, coverImage) VALUES (#{title}, #{content}, #{coverImage})")
//    @Results({
//            @Result(column = "title", property = "title", jdbcType = JdbcType.VARCHAR),
//            @Result(column = "content", property = "content", jdbcType = JdbcType.VARCHAR),
//            @Result(column = "cover_image", property = "coverImage", jdbcType = "com.zhenglou.utils.BlobTypeHandler")
//    })
    int insert(EnvironmentalKnowledge environmentalKnowledge);

    @Delete("DELETE FROM environmental_knowledge WHERE knowledgeId= #{id}")
    int delete(int id);

    @Update("UPDATE environmental_knowledge " +
            "SET title = #{title}, " +
            "content = #{content}, " +
            "coverImage = #{coverImage} " +
            "WHERE knowledgeId = #{knowledgeId}")
    int update(EnvironmentalKnowledge environmentalKnowledge);

    @Select("select * from environmental_knowledge")
    List<EnvironmentalKnowledge> selectAll();

    @Select("select * from environmental_knowledge where title = #{title}")
    EnvironmentalKnowledge selectOne(@Param("title") String title);

    @Select("select * from environmental_knowledge limit 10 offset ${(page-1) * 10};")
    List<EnvironmentalKnowledge> selectByPage(int page);
}
