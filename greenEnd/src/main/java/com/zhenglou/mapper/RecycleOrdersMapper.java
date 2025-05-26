package com.zhenglou.mapper;


import com.zhenglou.pojo.ProductOrders;
import com.zhenglou.pojo.RecycleOrders;
import com.zhenglou.pojo.WasteKnowledge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface RecycleOrdersMapper {
    @Insert("INSERT into recycle_orders(name, address, phone, appointmentTime, wasteInfo, userId) " +
            "VALUES (#{name}, #{address}, #{phone}, #{appointmentTime}, #{wasteInfo}, #{userId})")
    int insert(RecycleOrders record);

    @Delete("DELETE FROM recycle_orders WHERE orderId= #{id}")
    int delete(int id);

    @Update("UPDATE recycle_orders " +
            "SET name = #{name}," +
            "address = #{address}," +
            "phone = #{phone}," +
            "appointmentTime = #{appointmentTime}," +
            "wasteInfo = #{wasteInfo}," +
            "orderStatus = #{orderStatus}," +
            "workUserId = #{workUserId}," +
            "cancelReason = #{cancelReason}," +
            "cancelTime = #{cancelTime}," +
            "completeTime = #{completeTime} " +
            "WHERE orderId = #{orderId}")
    int update(RecycleOrders record);

    @Update("UPDATE recycle_orders " +
            "SET orderStatus = #{orderStatus}," +
            "cancelReason = #{cancelReason}," +
            "cancelTime = #{cancelTime} " +
            "WHERE orderId = #{orderId}")
    int updateCancelStatus(RecycleOrders record);

    @Update("UPDATE recycle_orders " +
            "SET completeTime = #{completeTime} " +
            "WHERE orderId = #{orderId}")
    int updateCompleteStatus(RecycleOrders record);

    @Select("select * from recycle_orders order by orderId desc ")
    List<RecycleOrders> selectAll();

    @Select("select * from recycle_orders where orderId = #{orderId}")
    RecycleOrders selectById(int orderId);

    @Select("select * from recycle_orders where userId = #{userId} order by orderId desc")
    List<RecycleOrders> selectByUserId(int userId);

    @Select("select * from recycle_orders where userId = #{userId} and orderStatus = #{orderStatus} order by orderId desc")
    List<RecycleOrders> selectByIdAndStatus(RecycleOrders record);

    @Select("select * from recycle_orders where workUserId = #{workUserId} and orderStatus = #{orderStatus} order by orderId desc")
    List<RecycleOrders> selectByWorkIdAndStatus(RecycleOrders record);

    @Select("select * from recycle_orders limit 6 offset ${(page-1) * 6};")
    List<RecycleOrders> selectByPage(int page);
}
