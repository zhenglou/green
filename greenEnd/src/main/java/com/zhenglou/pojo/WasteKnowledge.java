package com.zhenglou.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
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
@TableName("waste_knowledge")
public class WasteKnowledge implements Serializable {

    private static final long serialVersionUID = 1L;

    private String wasteType;

    private String description;

    private String examples;

    private LocalDateTime createTime;

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    @TableId(value = "wasteId", type = IdType.AUTO)
    private Integer wasteId;

    public String getWasteType() {
        return wasteType;
    }

    public void setWasteType(String wasteType) {
        this.wasteType = wasteType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExamples() {
        return examples;
    }

    public void setExamples(String examples) {
        this.examples = examples;
    }

    public Integer getWasteId() {
        return wasteId;
    }

    public void setWasteId(Integer wasteId) {
        this.wasteId = wasteId;
    }

    @Override
    public String toString() {
        return "WasteKnowledge{" +
            "wasteType = " + wasteType +
            ", description = " + description +
            ", examples = " + examples +
            ", wasteId = " + wasteId +
        "}";
    }
}
