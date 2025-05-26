package com.zhenglou.mapper;


import com.zhenglou.pojo.Products;
import com.zhenglou.pojo.RecyClingPrice;
import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ProductsMapper {
    @Insert("INSERT into products(name, imageUrl, goodPoint) VALUES (#{name}, #{imageUrl}, #{goodPoint})")
    int insert(Products products);

    @Delete("DELETE FROM products WHERE productId= #{id}")
    int delete(int id);

    @Update("UPDATE products " +
            "SET name = #{name}, " +
            "imageUrl = #{imageUrl}, " +
            "goodPoint = #{goodPoint} " +
            "WHERE productId = #{productId}")
    int update(Products products);

    @Select("select * from products")
    List<Products> selectAll();

    @Select("select * from products where name = #{name}")
    Products selectOne(String name);

    @Select("select * from products where productId = #{productId}")
    Products selectById(Products products);

    @Select("select * from products limit 6 offset ${(page-1) * 6};")
    List<Products> selectByPage(int page);
}
