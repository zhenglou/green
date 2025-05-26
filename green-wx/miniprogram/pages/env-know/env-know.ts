// pages/env-know/env-know.ts
import { selectAll } from "../../api/envKnow"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envInfo: [] || null
  },
  envKnowDetail(event:any){
    console.log(event.currentTarget.dataset.param);
    let detailInfo = event.currentTarget.dataset.param;
    delete detailInfo['coverImage']
    const detailInfoString = JSON.stringify(detailInfo);
    
    wx.navigateTo({
      url: `/pages/env-know-detail/env-know-detail?detailInfo=${encodeURIComponent(detailInfoString)}`
    });
    // wx.navigateTo({url: `/pages/env-know-detail/env-know-detail?detailInfo=${detailInfo}`});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    const envInfo: any = await selectAll();
    this.setData({ envInfo: envInfo })

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