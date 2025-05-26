// pages/order-detail/order-detail.ts
import {selectById} from "../../api/prod"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo:{},
    statusIcon:'',
    statusMsg:'',
    key:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
async onLoad(options:any) {
    const iconImageUrl=['../../images/orderDetail/取消.png','../../images/orderDetail/提交.png','../../images/orderDetail/完成.png']
    const statusMsg = ['已取消','已提交','已完成']
    const {detailInfo,key} = options
    console.log(key);
      // 使用 JSON.parse 解析传递的 JSON 字符串
      const parsedDetailInfo = JSON.parse(decodeURIComponent(detailInfo));
      console.log(parsedDetailInfo);
      console.log(iconImageUrl[parsedDetailInfo.orderStatus]);
      if (detailInfo) {
        if(key == 2){
        const aaa:any = await selectById({productId:parsedDetailInfo.productId});
        parsedDetailInfo['productName'] = aaa.name;
        }
        console.log(parsedDetailInfo,"2");
        
      this.setData({detailInfo:parsedDetailInfo,statusIcon:iconImageUrl[parsedDetailInfo.orderStatus],statusMsg:statusMsg[parsedDetailInfo.orderStatus],key:key})
      console.log(this.data.detailInfo);
      
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