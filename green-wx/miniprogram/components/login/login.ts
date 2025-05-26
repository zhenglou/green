import { increment } from "../../api/dailyStatistics"
import { getCurrentDate } from "../../utils/util"
import request from '../../utils/request';
import { selectByUserOne as selectProOrdByUser } from "../../api/proOrd"
import { selectByUserOne as selectRecOrdByUser } from "../../api/recOrd"
const app = getApp();
Component({
  properties: {
    loginApi: {
      type: String,
      value: '/login', // 默认登录接口
    },
    registerApi: {
      type: String,
      value: '/increaseUserByUser', // 默认注册接口
    },
  },
  data: {
    userName: '',
    password: '',
  } as { userName: string | any; password: string | any },
  methods: {
    // 更新用户名
    onUserNameChange(e: WechatMiniprogram.Input) {
      // console.log(e);
      this.setData({ userName: e.detail });
      // console.log(this.data.userName); 
    },
    // 更新密码
    onPasswordChange(e: WechatMiniprogram.Input) {
      this.setData({ password: e.detail });
    },
    // 登录操作
    async onLogin() {
      const { userName, password } = this.data;
      if (!userName || !password) {
        wx.showToast({ title: '请输入用户名和密码', icon: 'none' });
        return;
      }
      try {
        const response: any = await request({
          url: this.properties.loginApi,
          method: 'POST',
          data: {
            userName, password
          },
        })
        if (response.code == 1) {
          wx.setStorage({
            key: "token",
            data: response.data.token
          })
          this.triggerEvent('loginChange', 1);
          app.setGlobalData("loginStatus", 1);
          let userInfo = response.data.user;
          const proInfo: any = await selectProOrdByUser(userInfo.userId);
          const recInfo: any = await selectRecOrdByUser(userInfo.userId);
          userInfo["proOrdCount"] = proInfo.length;
          userInfo["recOrdCount"] = recInfo.length;
          userInfo["grade"] = Math.floor(userInfo.experience / 100)
          app.setGlobalData("userInfo", userInfo);
          this.triggerEvent('loginChange2');
          // console.log(userInfo,"login");
          wx.showToast({
            title: '登录成功',
          })
        }
        if (response.code == 0) {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'error'
          })
        }
        console.log(response);
      } catch (e) {
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        })
        console.log(e);
      }
    },
    // 注册操作
    async onRegister() {
      const { userName, password } = this.data;
      if (!userName || !password) {
        wx.showToast({ title: '请输入用户名和密码', icon: 'none' });
        return;
      }
      try {
        const response = await request({
          url: this.properties.registerApi,
          method: 'Post',
          data: {
            userName: userName,
            password: password,
            role: 1
          },
        })
        wx.showToast({
          title: '注册成功',
        });
        increment({ metricType: 'user_register', date: getCurrentDate(), increment: 1 })
      } catch (e) {
        wx.showToast({
          title: '用户已存在',
          icon: 'error',
        });
      }
    },
  },
});
