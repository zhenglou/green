// request.js
const BASE_URL = 'http://192.168.1.6:8081'; // 无线基础路由
// const BASE_URL = 'http://192.168.43.78:8081'; // 热点基础路由
const TIMEOUT = 5000; // 超时时间

const request = (options:any) => {
  return new Promise((resolve, reject) => {
    // 从本地存储中获取 token（假设 token 是存储在本地的）
    const token = wx.getStorageSync('token') || '';
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6InpoZW5nbG91IiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MzY4NDA4NzksImV4cCI6MTczNjkyNzI3OX0.TVz6saYhw3wI09xDbcIkGvmgFdNKp5IftQAyGlvG2cDdayakzpp9BCqpsbgHC9KniBidb0a032nuau6eFk5TXg";

    wx.request({
      url: BASE_URL + options.url, // 拼接基础 URL
      method: options.method || 'GET', // 默认请求方法为 GET
      data: options.data || {}, // 请求数据
      header: {
        'Content-Type': 'application/json', // 默认 Content-Type
        'token':token
      },
      timeout: TIMEOUT, // 设置超时时间
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data); // 请求成功，返回数据
        } else {
          wx.showToast({
            title: `错误：${res.statusCode}`,
            icon: 'none',
          });
          reject({
            message: '请求错误',
            statusCode: res.statusCode,
            data: res.data,
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络异常，请稍后再试',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
};

export default request;
