package com.zhenglou.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zhenglou.utils.Base64Deserializer;
import com.zhenglou.utils.Base64Serializer;

import java.io.Serializable;
import java.sql.Blob;
import java.time.LocalDateTime;

/**
 * <p>
 * 
 * </p>
 *
 * @author zhenglou
 * @since 2024-12-16
 */
@TableName("environmental_knowledge")
public class EnvironmentalKnowledge implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "knowledgeId", type = IdType.AUTO)
    private Integer knowledgeId;

    private String title;

    private String content;

    private LocalDateTime createTime;

    @JsonProperty("coverImage")
    private String coverImage;

    public Integer getKnowledgeId() {
        return knowledgeId;
    }

    public void setKnowledgeId(Integer knowledgeId) {
        this.knowledgeId = knowledgeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    @Override
    public String toString() {
        return "EnvironmentalKnowledge{" +
            "knowledgeId = " + knowledgeId +
            ", title = " + title +
            ", content = " + content +
            ", createTime = " + createTime +
            ", coverImage = " + coverImage +
        "}";
    }
}
