// components/mdUserInfo/mdUserInfo.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userName: '',
    password: '',
    phone:''
  } as { userName: string | any,password: string | any, phone: string | any },

  /**
   * 组件的方法列表
   */
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
    onPhoneChange(e: WechatMiniprogram.Input) {
      this.setData({ phone: e.detail });
    },
  },
  attached() {
    // 在组件初始化时获取 properties 的值
    this.setData({
      userName:this.data.userInfo.userName,
      password:this.data.userInfo.password,
      phone:this.data.userInfo.phone
    });
}
})