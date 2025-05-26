package com.zhenglou.utils;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

public class GeneralMapper {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/green", "root", "root")
                .templateEngine(new FreemarkerTemplateEngine()) // 切换模板引擎为 FreeMarker
                // 全局配置
                .globalConfig(builder -> {
                    builder.author("zhenglou") // 设置作者
                            .outputDir(System.getProperty("user.dir") + "/src/main/java") // 输出路径
                            .disableOpenDir(); // 禁止打开输出目录
                })
                // 包配置
                .packageConfig(builder -> {
                    builder.parent("com.zhenglou") // 设置父包名
                            .moduleName("testMapper") // 设置模块名
                            .pathInfo(Collections.singletonMap(OutputFile.xml, System.getProperty("user.dir") + "/src/main/resources/mapper")); // 设置Mapper XML生成路径
                })
                // 策略配置
                .strategyConfig(builder -> {
                    builder.addTablePrefix("prefix_"); // 设置过滤表前缀
                })
                .execute();
    }
}
