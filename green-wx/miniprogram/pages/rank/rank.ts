// pages/rank/rank.ts
import { getAllUserInfoOrderByExperience } from "../../api/user"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankInfo: [],
    myRankInfo: {},
    myRankIndex:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const myInfo = app.getGlobalData("userInfo")
    const rankInfo: any = await getAllUserInfoOrderByExperience()
    console.log(rankInfo);
    const myRankIndex = rankInfo.data.findIndex((v: { userName: any }) => v.userName == myInfo.userName)
    console.log(myRankIndex);
    this.setData({ rankInfo: rankInfo.data, myRankInfo: rankInfo.data[myRankIndex],myRankIndex:myRankIndex })
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