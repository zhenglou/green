package com.zhenglou.mapper;


import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.pojo.RecycleOrders;
import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ProductOrdersMapper {
    @Insert("INSERT into product_orders(name, address, productId,phone, quantity, userId) VALUES (#{name}, #{address},#{productId},#{phone} , #{quantity}, #{userId})")
    int insert(ProductOrders productOrders);

    @Delete("DELETE FROM product_orders WHERE orderId= #{id}")
    int delete(int id);

    @Update("UPDATE product_orders " +
            "SET name = #{name}," +
            "address = #{address}," +
            "quantity = #{quantity}," +
            "phone = #{phone}," +
            "orderStatus = #{orderStatus}," +
            "cancelReason = #{cancelReason}," +
            "cancelTime = #{cancelTime}," +
            "completeTime = #{completeTime} " +
            "WHERE orderId = #{orderId}")
    int update(ProductOrders productOrders);

    @Update("UPDATE recycle_orders " +
            "SET orderStatus = #{orderStatus}," +
            "cancelReason = #{cancelReason}," +
            "cancelTime = #{cancelTime} " +
            "WHERE orderId = #{orderId}")
    int updateCancelStatus(ProductOrders productOrders);

    @Update("UPDATE recycle_orders " +
            "SET completeTime = #{completeTime} " +
            "WHERE orderId = #{orderId}")
    int updateCompleteStatus(ProductOrders productOrders);

    @Select("select * from product_orders")
    List<ProductOrders> selectAll();

    @Select("select * from product_orders where orderId = #{orderId}")
    ProductOrders selectById(int orderId);

    @Select("select * from product_orders where userId = #{userId} and orderStatus = #{orderStatus}")
    List<ProductOrders> selectByIdAndStatus(ProductOrders productOrders);

    @Select("select * from product_orders where userId = #{userId}")
    List<ProductOrders> selectByUserId(int userId);

    @Select("select * from product_orders limit 6 offset ${(page-1) * 6};")
    List<ProductOrders> selectByPage(int page);
}
