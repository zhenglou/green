// pages/personal/personal.ts
import { onTabClick } from "../../utils/util"
// import {selectByUserOne as selectProOrdByUser} from "../../api/proOrd"
// import {selectByUserOne as selectRecOrdByUser} from "../../api/recOrd"
import {update2} from "../../api/user"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    loginDisplay:true,
    userInfo: app.getGlobalData("userInfo") || {},
    show:false
  } as {show:any,username:any,password:any,loginDisplay:any,userInfo:any},
async loginChange(e:any){
    if(e.detail == 1 || e == 1){
      this.setData({
        loginDisplay:false
      })
    }
    if(e.detail == 0 || e == 0){
      this.setData({
        loginDisplay:true
      })
    }
  },
  loginChange2(){
    this.setData({
      userInfo:app.getGlobalData("userInfo")
    })
  },
  onTabClicks(event: any) {
    onTabClick(event)
  },
  quitLogin(){
    wx.setStorage({
      key:"token",
      data:null
    })
    this.loginChange(0);
    this.setData({userInfo:{}})
    app.setGlobalData("loginStatus", 0);
    app.setGlobalData("userInfo", {});
  },
  showDisplay(){
    this.setData({show:true})
    console.log(this.data.userInfo);
    
  },
  async modifyUserInfo(event:any) {
    const child = this.selectComponent('#md');
    console.log(child);
    const xgInfo:any = {
      userName:child.data.userName,
      password:child.data.password,
      phone:child.data.phone,
      userId:child.data.userInfo.userId
    }
    const result = await update2(xgInfo);
    if(result == 1){
      let newUserInfo:any = this.data.userInfo;
      newUserInfo['userName'] = child.data.userName;
      newUserInfo['password'] = child.data.password,
      newUserInfo['phone'] = child.data.phone,
      this.setData({userInfo:newUserInfo});
      app.setGlobalData("userInfo",newUserInfo);
      wx.showToast({
        title:'修改成功',
        icon:'success'
      })
    }else{
      wx.showToast({
        title:'修改失败',
        icon:'error'
      })
    }
    
    
  },
  onClose() {
    console.log(22222222);
    
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad() {
    // const loginStatus = app.getGlobalData("loginStatus")
    const userInfo = app.getGlobalData("userInfo")
    if(!userInfo){
      this.loginChange(0)
      app.setGlobalData("loginStatus",0)
    }
    else if(userInfo){
      console.log("执行");
      this.loginChange(1)
      app.setGlobalData("loginStatus",1)
      this.setData({
        userInfo:userInfo
      })
    }
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