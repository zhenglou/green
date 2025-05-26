// pages/orders/orders.ts
import { onTabClick } from "../../utils/util"
import { selectByUserOne, selectByIdAndStatus } from "../../api/recOrd"
import { selectByUserOne as selectByUserOne2, selectByIdAndStatus as selectByIdAndStatus2} from "../../api/proOrd"
const app = getApp();
const userInfo = app.getGlobalData("userInfo")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allInfo: [],
    info0: [],
    info1: [],
    info2: [],
    key:1
  } as {
    allInfo: any
    info0: any
    info1: any
    info2: any,
    key:any
  },
  onTabClicks(event: any) {
    onTabClick(event)
  },
  changeOrd(){
    const key = this.data.key == 1?2:1;
    this.setData({key});
    this.initInfo();
  },
  async initInfo() {
    if(this.data.key == 1){
      const allInfo = await selectByUserOne(userInfo.userId);
      const info0 = await selectByIdAndStatus({ userId: userInfo.userId, orderStatus: 0 })
      const info1 = await selectByIdAndStatus({ userId: userInfo.userId, orderStatus: 1 })
      const info2 = await selectByIdAndStatus({ userId: userInfo.userId, orderStatus: 2 })
      this.setData({
        allInfo,
        info0,
        info1,
        info2
      })
    }
    if(this.data.key == 2){
      const allInfo = await selectByUserOne2(userInfo.userId);
      const info0 = await selectByIdAndStatus2({ userId: userInfo.userId, orderStatus: 0 })
      const info1 = await selectByIdAndStatus2({ userId: userInfo.userId, orderStatus: 1 })
      const info2 = await selectByIdAndStatus2({ userId: userInfo.userId, orderStatus: 2 })
      this.setData({
        allInfo,
        info0,
        info1,
        info2
      })
    }


  },
  handleChildEvent(e:any){
    this.initInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initInfo();
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
    this.initInfo();
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