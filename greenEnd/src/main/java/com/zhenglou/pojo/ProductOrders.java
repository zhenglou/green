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
@TableName("product_orders")
public class ProductOrders implements Serializable {

    private static final long serialVersionUID = 1L;
    private String name;
    private String orderId;

    private String address;

    private String phone;

    private Integer productId;

    private Integer quantity;

    private Integer userId;

    private Integer orderStatus;

    private String cancelReason;

    private LocalDateTime createTime;

    private LocalDateTime cancelTime;

    private LocalDateTime completeTime;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "ProductOrders{" +
            "orderId = " + orderId +
            ", address = " + address +
            ", productId = " + productId +
            ", quantity = " + quantity +
            ", userId = " + userId +
            ", orderStatus = " + orderStatus +
            ", cancelReason = " + cancelReason +
            ", createTime = " + createTime +
            ", cancelTime = " + cancelTime +
            ", completeTime = " + completeTime +
        "}";
    }
}
