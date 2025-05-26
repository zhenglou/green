package com.zhenglou.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

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
public class Products implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "productId", type = IdType.AUTO)
    private Integer productId;

    private String name;

    private String imageUrl;

    private LocalDateTime createTime;

    private Integer goodPoint;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Integer getGoodPoint() {
        return goodPoint;
    }

    public void setGoodPoint(Integer goodPoint) {
        this.goodPoint = goodPoint;
    }

    @Override
    public String toString() {
        return "Products{" +
            "productId = " + productId +
            ", name = " + name +
            ", imageUrl = " + imageUrl +
            ", createTime = " + createTime +
            ", goodPoint = " + goodPoint +
        "}";
    }
}
