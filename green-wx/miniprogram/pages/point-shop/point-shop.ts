// pages/point-shop/point-shop.ts
import { selectAll } from "../../api/prod"
import { insert } from "../../api/proOrd"
import { update } from "../../api/user"
import { increment } from "../../api/dailyStatistics"
import { getCurrentDate } from "../../utils/util"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodInfo: [],
    userInfo: app.getGlobalData("userInfo"),
    points: app.getGlobalData("userInfo").points,
    orderDisplay: false,
    orderCurrent: 0,
    prodCount: '',
    recipient: '',        // 收件人
    phone: '',            // 电话
    detailAddress: '',    // 详细地址
  } as { prodInfo: any, userInfo: any, points: any, orderDisplay: any, orderCurrent: any, prodCount: any, recipient: any, address: any, phone: any, detailAddress: any, areaList: any },
  showOrder(e: any) {
    const { index } = e.currentTarget.dataset;
    this.setData({ orderCurrent: index, orderDisplay: true })
    console.log(index);

  },
  async confirmOrder() {
    const { recipient, phone, prodCount, detailAddress, userInfo, prodInfo, orderCurrent } = this.data;
    if (prodCount * prodInfo[orderCurrent].goodPoint > userInfo.points) {
      wx.showToast({
        title: '积分不足',
        icon: 'error'
      });
      return
    }
    const dataInfo = {
      name: recipient,
      address: detailAddress,
      productId: prodInfo[orderCurrent].productId,
      phone: phone,
      quantity: prodCount,
      userId: userInfo.userId
    }

    const status = await insert(dataInfo);

    // 模拟提交数据
    if (status == 1) {
      wx.showToast({
        title: '兑换成功',
        icon: 'success'
      });
      let newUserInfo = userInfo;
      newUserInfo.points -= prodCount * prodInfo[orderCurrent].goodPoint;
      this.setData({ userInfo: newUserInfo, points: newUserInfo.points })
      app.setGlobalData("userInfo", newUserInfo)
      console.log(this.data.userInfo);
      update(newUserInfo)
      increment({ metricType: 'product_exchange', date: getCurrentDate(), increment: this.data.prodCount })
    }


    // 清空表单
    this.setData({
      recipient: '',
      phone: '',
      detailAddress: '',
      prodCount: 0
    });
  },
  onClose() {
    this.setData({
      recipient: '',
      phone: '',
      detailAddress: '',
      prodCount: ''
    });
    this.setData({ orderDisplay: false });
  },
  // 收件人输入变化
  onProdCountAddressChange(event: any) {
    this.setData({
      prodCount: event.detail
    });
  },
  // 收件人输入变化
  onRecipientChange(event: any) {
    this.setData({
      recipient: event.detail
    });
  },

  // 电话输入变化
  onPhoneChange(event: any) {
    this.setData({
      phone: event.detail
    });
  },
  // 详细地址输入变化
  onDetailAddressChange(event: any) {
    this.setData({
      detailAddress: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    console.log(app.getGlobalData("userInfo"));


    console.log(this.data.userInfo);

    const produtInfo = await selectAll();
    console.log(produtInfo);
    this.setData({ prodInfo: produtInfo })
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