// app.ts
import { getUserInfoByToken, getTokenAvailable } from "./api/user"
import { selectByUserOne as selectProOrdByUser } from "./api/proOrd"
import { selectByUserOne as selectRecOrdByUser } from "./api/recOrd"
App<IAppOption | any>({
  globalData: {
    userInfo: null,
    loginStatus: 0
  } as { userInfo: object | any, loginStatus: number },
  setGlobalData(key: string | number, value: any) {
    this.globalData[key] = value;
  },
  getGlobalData(key: string | number) {
    return this.globalData[key];
  },
  async onLaunch() {
    const token = wx.getStorageSync('token')
    let tokenAvailable: any = null
    if (token) {
      tokenAvailable = getTokenAvailable(token)
    }
    if (token && !tokenAvailable.data) {
      const userInfoRaw: any = await getUserInfoByToken(token);
      let userInfo: any = userInfoRaw.data;
      const proInfo: any = await selectProOrdByUser(userInfo.userId);
      const recInfo: any = await selectRecOrdByUser(userInfo.userId);
      userInfo["proOrdCount"] = proInfo.length;
      userInfo["recOrdCount"] = recInfo.length;
      userInfo["grade"] = Math.floor(userInfo.experience / 100)
      // console.log(userInfo);
      this.globalData.userInfo = userInfo
      this.globalData.loginStatus = 1
      
    }
    wx.onAppRoute((res) => {
      // 获取跳转的页面信息
      const { path, query } = res;

      // 你可以在这里做全局拦截，比如判断登录状态
      if (path !== 'pages/personal/personal' && path !== 'pages/index/index' && path !== 'pages/orders/orders' && this.globalData.loginStatus != 1) {
        wx.switchTab({
          url: '/pages/personal/personal',
          success: function() {
            wx.showToast({
              title: "请前往登录"
            })
          },
          fail: function(err) {
            wx.showToast({
              title: "请前往登录"
            })
          }
        });
      }
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log(wx.getSystemInfoSync());

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})