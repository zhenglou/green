// pages/classification-detail/classification-detail.ts
import { selectOne as selectWasType } from "../../api/wasKno"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wasInfo: {} || null
  } as { wasInfo: any },
  backo() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const wasteTypeArr = ['可回收垃圾', '厨余垃圾', '有害垃圾', '其他垃圾']
    const wasteImgaeSrc = ['../../images/funcArea/可回收.png', '../../images/funcArea/厨余垃圾.png', '../../images/funcArea/有害垃圾.png', '../../images/funcArea/其他垃圾.png']
    const wasteBgcColor = ['#006FE5', '#663F05', '#FF0F43', '#8b9692']
    // 获取参数
    const key = Number(options.key);  // 这里获取的是传递的 id 参数
    // console.log("接收到的 key:", key);
    // 可以根据 id 参数进行后续的操作
    const wasInfo: any = await selectWasType(wasteTypeArr[key])
    //  console.log(wasInfo);
    wasInfo['wasteImageSrc'] = wasteImgaeSrc[key]
    wasInfo['wasteBgcColor'] = wasteBgcColor[key]
    this.setData({
      wasInfo: wasInfo
    })
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