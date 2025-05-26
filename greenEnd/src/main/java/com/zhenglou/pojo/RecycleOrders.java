package com.zhenglou.pojo;

import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 
 * </p>
 *
 * @author zhenglou
 * @since 2024-12-16
 */
@TableName("recycle_orders")
public class RecycleOrders implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer orderId;

    private String name;

    private String address;

    private String phone;

    private LocalDateTime appointmentTime;

    private String wasteInfo;

    private Integer orderStatus;

    private Integer userId;

    private String cancelReason;

    private Integer workUserId;

    private LocalDateTime createTime;

    private LocalDateTime cancelTime;

    private LocalDateTime completeTime;

    public Integer getWorkUserId() {
        return workUserId;
    }

    public void setWorkUserId(Integer workUserId) {
        this.workUserId = workUserId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getWasteInfo() {
        return wasteInfo;
    }

    public void setWasteInfo(String wasteInfo) {
        this.wasteInfo = wasteInfo;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getCancelTime() {
        return cancelTime;
    }

    public void setCancelTime(LocalDateTime cancelTime) {
        this.cancelTime = cancelTime;
    }

    public LocalDateTime getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(LocalDateTime completeTime) {
        this.completeTime = completeTime;
    }

    @Override
    public String toString() {
        return "RecycleOrders{" +
            "orderId = " + orderId +
            ", name = " + name +
            ", address = " + address +
            ", phone = " + phone +
            ", appointmentTime = " + appointmentTime +
            ", wasteInfo = " + wasteInfo +
            ", orderStatus = " + orderStatus +
            ", userId = " + userId +
            ", cancelReason = " + cancelReason +
            ", createTime = " + createTime +
            ", cancelTime = " + cancelTime +
            ", completeTime = " + completeTime +
        "}";
    }
}
