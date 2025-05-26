package com.zhenglou.mapper;


import com.zhenglou.pojo.RecyClingPrice;
import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface RecyclingPricesMapper {
    @Insert("INSERT into recycling_prices(wasteName, description, price) VALUES (#{wasteName}, #{description}, #{price})")
    int insert(RecyClingPrice recyClingPrice);

    @Delete("DELETE FROM recycling_prices WHERE recyPricId= #{id}")
    int delete(int id);

    @Update("UPDATE recycling_prices " +
            "SET wasteName = #{wasteName}, " +
            "description = #{description}, " +
            "price = #{price} " +
            "WHERE recyPricId = #{recyPricId}")
    int update(RecyClingPrice recyClingPrice);

    @Select("select * from recycling_prices")
    List<RecyClingPrice> selectAll();

    @Select("select * from recycling_prices where wasteName = #{wasteName}")
    List<RecyClingPrice> selectByWasteName(String wasteName);

    @Select("select * from recycling_prices limit 6 offset ${(page-1) * 6};")
    List<RecyClingPrice> selectByPage(int page);

    @Select("select distinct wasteName from recycling_prices")
    List<RecyClingPrice> selectAllWasteName();
}
