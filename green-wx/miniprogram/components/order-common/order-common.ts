// components/order-common/order-common.ts
import { deleteOne, update } from "../../api/recOrd"
import {  update as update2 } from "../../api/proOrd"
import Toast from '@vant/weapp/toast/toast';

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    allItems: {
      type: Object,
      value: []
    },
    titleType: {
      type: String,
      value: '可回收物回收'
    },
    detailInfo: {
      type: Array,
      value: ['订单编号', '联系人', '取件地址', '预约时间']
    },
    key:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cancelReason: '',
    show: false,
    orderDetailInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(e: any) {
      // console.log(e.currentTarget.dataset.item);
      const detailInfoString = JSON.stringify(e.currentTarget.dataset.item);
      const key = e.currentTarget.dataset.key
      console.log(detailInfoString);
      wx.navigateTo({
        url: `/pages/order-detail/order-detail?detailInfo=${encodeURIComponent(detailInfoString)}&key=${key}`
      });
    },
    async cancelOrder(e: any) {
      console.log(e.currentTarget.dataset.item);
      let orderDetailInfo = e.currentTarget.dataset.item
      this.setData({ show: true, orderDetailInfo: orderDetailInfo })

    
    },
    changeReason(e) {
      const value = e.detail.value;
      // 更新数据 
      this.setData({
        cancelReason: value,
      });

    },
    formatToISO:() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    },
    async cancelOrder2() {
      const now = this.formatToISO();
      let k; 
      console.log(now);
      let { orderDetailInfo, cancelReason } = this.data;
      orderDetailInfo['orderStatus'] = 0;
      orderDetailInfo['cancelReason'] = cancelReason;
      orderDetailInfo['cancelTime'] = now;
      console.log(orderDetailInfo);
      if(this.data.key == 1){
         k = await update(this.data.orderDetailInfo);
      }
      if(this.data.key == 2){
        k = await update2(this.data.orderDetailInfo);
      }

      if (k == 1) {
        this.triggerEvent('customEvent'); 
        this.onClose()
        wx.showToast({ title: '取消成功', icon: 'success' });
      } else {
        wx.showToast({ title: '取消失败', icon: 'error' });
      }
    },
    onClose() {
      this.setData({ show: false,cancelReason:'' });
    }
  }
})