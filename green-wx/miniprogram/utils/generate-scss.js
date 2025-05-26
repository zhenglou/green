const fs = require("fs");
const systemInfo = wx.getSystemInfoSync();
const pixelRatio1 = 750 / systemInfo.windowWidth;

// 动态生成 SCSS 文件
const scssContent = `$pixelRatio1: ${pixelRatio1};\n`;
fs.writeFileSync("/miniprogram/styles/_dynamic.scss", scssContent, "utf8");
