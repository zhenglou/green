// pages/photo-ai/photo-ai.ts
// import {signRequest} from "../../utils/tenxuny"
import SHA256 from '../../utils/crypto-js/sha256';
import HmacSHA256 from '../../utils/crypto-js/hmac-sha256';
import Hex from '../../utils/crypto-js/enc-hex';
import { increment } from "../../api/dailyStatistics"
import { getCurrentDate } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '', // 存储拍照后的图片路径
    garbageType: '', // 存储识别出的垃圾类型
    garbageType2: '', // 存储识别出的垃圾类型
    imageBase64: '',
    model: '',
    messages: [
      {
        "Role": "system",
        "Content": "将英文单词转换为包括中文翻译、英文释义和一个例句的完整解释。请检查所有信息是否准确，并在回答时保持简洁，不需要任何其他反馈。"
      },
      {
        "Role": "user",
        "Content": "nice"
      }
    ]

  },
  // 拍照
  takePhoto() {
    const camera = wx.createCameraContext();
    camera.takePhoto({
      quality: 'high',
      success: (res) => {

        const base64Image: any = this.convertToBase64(res.tempImagePath);
        // console.log(base64Image);

        this.setData({
          imagePath: res.tempImagePath
          // imageBase64:base64Image
        });

      },
      fail: (err) => {
        wx.showToast({ title: '拍照失败', icon: 'none' });
      },
    });
  },
  takePhoto2() {
    this.setData({ imagePath: '', garbageType: '', garbageType2: '' })
  },
  wasteTypeDeepseek() {
    wx.request({
      url: 'https://api.deepseek.com/chat/completions',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ''
      },
      method: 'POST',
      data: {
        "model": "deepseek-reasoner",
        "messages": [
          { "role": "system", "content": "接下里请根据我给的物品名称来给出物品的垃圾类型，只要垃圾类型信息，其他的都不要" },
          { "role": "user", "content": this.data.garbageType }
        ],
        "stream": false
      },
      success: res => {
        console.log(res.data.choices[0].message.content);
        this.setData({ garbageType2: res.data.choices[0].message.content })

      }
    })
  },
  wasteTypeAi() {
      const Authorization = this.generateAuthorization('', '', '', 'hunyuan.tencentcloudapi.com', 'hunyuan');
    console.log(Authorization);

    wx.request({
      url: 'https://hunyuan.tencentcloudapi.com',
      method: 'POST',
      data: {
        "TopP": 1,
        "Temperature": 1,
        "Model": "hunyuan-pro",
        "Stream": true,
        "Messages": [
          {
            "Role": "system",
            "Content": "将英文单词转换为包括中文翻译、英文释义和一个例句的完整解释。请检查所有信息是否准确，并在回答时保持简洁，不需要任何其他反馈。"
          },
          {
            "Role": "user",
            "Content": "nice"
          }
        ]
      },
      header: {
        'X-TC-Timestamp': Math.floor(Date.now() / 1000), // 当前时间戳
        'X-TC-Action': 'ChatCompletions',
        'X-TC-Version': '2023-09-01',
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      success: res => {
        console.log(res);
        // this.setData({garbageType:res.data.Response.Products[0].Name})

        // console.log(res);
      }
    })
  },
  imageAi(e: any) {
    this.setData({ garbageType2: '正在查询', garbageType: '正在识别' })
    const Authorization = this.generateAuthorization(this.data.imageBase64, '', '', 'tiia.tencentcloudapi.com', 'tiia');
    console.log(Authorization);


    wx.request({
      url: 'https://tiia.tencentcloudapi.com',
      method: 'POST',
      data: {
        ImageBase64: this.data.imageBase64
      },
      header: {
        'X-TC-Region': 'ap-guangzhou',
        'X-TC-Timestamp': Math.floor(Date.now() / 1000), // 当前时间戳
        'X-TC-Action': 'DetectProduct',
        'X-TC-Version': '2019-05-29',
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      success: res => {
        console.log(res);
        try {
          this.setData({ garbageType: res.data.Response.Products[0].Name })
          this.wasteTypeDeepseek();
          increment({ metricType: 'ai_usage', date: getCurrentDate(), increment: 1 })
        } catch (e) {
          wx.showToast({ title: '识别失败请重试', icon: 'error' })
        }
        // this.wasteTypeAi()
        // console.log(res);
      },
      fail: err => {
        wx.showToast({ title: '识别失败请重试', icon: 'error' })
      }
    })
  },
  convertToBase64(filePath: any) {
    const fs = wx.getFileSystemManager(); // 获取文件管理器
    fs.readFile({
      filePath: filePath,  // 文件路径
      encoding: 'base64',  // 编码格式
      success: (res) => {
        this.setData({ imageBase64: res.data }); // 保存 Base64 数据
        // console.log('Base64 数据：', res.data);
      },
      fail: (err) => {
        console.error('转换 Base64 失败：', err);
      },
    });
  },
  generateAuthorization(imageBase64: any, secretId: any, secretKey: any, host: any, service: any) {
    // const host = 'tiia.tencentcloudapi.com';
    // const service = 'tiia';
    const date = new Date().toISOString().split('T')[0];
    const timestamp = Math.floor(Date.now() / 1000); // 当前时间戳（秒）
    console.log(timestamp, "timestamp");
    console.log(date, "date");

    let payload = ''
    // 请求体 JSON 数据
    if (service == 'tiia') {
      payload = JSON.stringify({ ImageBase64: imageBase64 });
    }
    if (service === 'hunyuan') {
      payload = JSON.stringify({
        "TopP": 1,
        "Temperature": 1,
        "Model": "hunyuan-pro",
        "Stream": true,
        "Messages": [
          {
            "Role": "system",
            "Content": "将英文单词转换为包括中文翻译、英文释义和一个例句的完整解释。请检查所有信息是否准确，并在回答时保持简洁，不需要任何其他反馈。"
          },
          {
            "Role": "user",
            "Content": "nice"
          }
        ]
      });
    }
    // 构造 Canonical Request
    let canonicalRequest = ''
    if (service == 'tiia') {
      canonicalRequest = [
        'POST',
        '/',
        '',
        `content-type:application/json\nhost:${host}\n`,
        'content-type;host',
        SHA256(payload).toString(Hex),
      ].join('\n');
    }
    if (service == 'hunyuan') {
      canonicalRequest = [
        'POST',
        '/',
        '',
        `content-type:application/json\nhost:${host}\nx-tc-action:ChatCompletions\n`, // 增加 x-tc-action
        'content-type;host;x-tc-action', // 更新 SignedHeaders，增加 x-tc-action
        SHA256(payload).toString(Hex),
      ].join('\n');
    }


    // 构造 StringToSign
    const stringToSign = [
      'TC3-HMAC-SHA256',
      timestamp,
      `${date}/${service}/tc3_request`,
      SHA256(canonicalRequest).toString(Hex),
    ].join('\n');

    // 生成签名密钥
    const kDate = HmacSHA256(date, `TC3${secretKey}`);
    const kService = HmacSHA256(service, kDate);
    const kSigning = HmacSHA256('tc3_request', kService);

    // 生成最终签名
    const signature = HmacSHA256(stringToSign, kSigning).toString(Hex);
    console.log('Canonical Request:', canonicalRequest);
    console.log('String To Sign:', stringToSign);
    console.log('Signature:', signature);
    // 返回 Authorization 字符串
    if (service == 'tiia') {
      return `TC3-HMAC-SHA256 Credential=${secretId}/${date}/${service}/tc3_request, SignedHeaders=content-type;host, Signature=${signature}`;
    }
    return `TC3-HMAC-SHA256 Credential=${secretId}/${date}/${service}/tc3_request, SignedHeaders=content-type;host;x-tc-action, Signature=${signature}`;
  },

  // 垃圾分类识别
  classifyGarbage() {
    if (!this.data.imagePath) {
      wx.showToast({ title: '请先拍照', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '识别中...' });

    // 上传图片到服务器或者云函数进行处理
    wx.uploadFile({
      url: 'https://example.com/garbage-classify', // 替换为实际的服务端识别接口
      filePath: this.data.imagePath,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        this.setData({
          garbageType: data.type || '无法识别',
        });
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '识别失败', icon: 'none' });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})