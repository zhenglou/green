const app = getApp();
const userInfo = app.getGlobalData("userInfo")
import {insert} from "../../api/recOrd"
import {increment} from "../../api/dailyStatistics"
import {getCurrentDate} from "../../utils/util"
Page({
  data: {
    // 收件信息
    name: '',
    phone: '',
    detailAddress: '',
    address: '',
    // 上门预约信息
    date: '2024-11-02',
    time: '14:00',
    endTime: '',
    // 垃圾种类
    selectedCategory: '',
    selectedCategory2: {},
    selectedCategories: [],
    selectedCategories2:[],
    // 弹出框
    show: false,
    region: ['请', '选择', '地址'],
    customItem: '全部',
    showList: 0,
    showBook: false,
    success:false,
    bookColumns: [
      {
        values: ['纸类', '金属', '泡沫', '塑料', '玻璃', '旧物'],
        className: 'column1',
      },
      {
        values: ['0kg-10kg', '10kg-30kg', '30kg-50kg', '50kg以上'],
        className: 'column2',
      },
    ],
  },
  comback(e){
    const { index } = e.currentTarget.dataset;
    if(index == 1){
      wx.switchTab({
        url: '/pages/index/index',
        success: function() {
          // console.log('跳转成功');
        }
      })
    }
    if(index == 2){
      wx.switchTab({
        url: '/pages/orders/orders',
        success: function() {
          // console.log('跳转成功');
        }
      })
    }
  },
  onBookCounlmsChange(e: any) {
    const { picker, value, index } = e.detail;
    // picker.setColumnValues(1, citys[value[0]]);
    console.log(value)
    const wasteInfo = value[0] + value[1]
    const wasteInfo2 = {
      name:value[0],
      kg:value[1]
    }
    console.log(wasteInfo2);
    
    this.setData({ selectedCategory: wasteInfo,selectedCategory2:wasteInfo2});
  },
  // 弹出框
  bindRegionChange: function (e: any) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 更新收件人信息
  onNameInput(e: any) {
    this.setData({ name: e.detail.value });
  },
  onPhoneInput(e: any) {
    this.setData({ phone: e.detail.value });
  },
  onAddressInput(e: any) {
    this.setData({ detailAddress: e.detail.value });
  },
  //------------
  addressDisplay() {
    this.setData({ showList: 0, show: true })
  },
  appiontDisplay() {
    this.setData({ showList: 1, show: true })
  },
  save() {
    let newAddress = ''
    newAddress = this.data.region[0] + this.data.region[1] + this.data.region[2]+ this.data.detailAddress
    console.log(newAddress, "newAddress");

    this.setData({ address: newAddress, show: false })
    // wx.navigateBack()
  },
  save2() {
    console.log(22222);
    
    let endTime = this.data.date + "T" + this.data.time
    this.setData({ endTime: endTime, show: false })
  },
  // 更新日期
  onDateChange(e:any) {
    this.setData({ date: e.detail.value });
  },

  // 更新时间
  onTimeChange(e:any) {
    this.setData({ time: e.detail.value });
  },
  // 添加种类
  addCategory() {
    this.setData({ showBook: true })
  },
  onCloseBook() {
    this.setData({ showBook: false })
  },
  confirmWasteInfo() {
    const newCategory:any = this.data.selectedCategory;
    const newCategory2:any = this.data.selectedCategory2;
    if (this.data.selectedCategories.includes(newCategory)) {
      wx.showToast({
        title: '种类已添加',
        icon: 'none',
      });
      return;
    }else{
      this.setData({
        selectedCategories: [...this.data.selectedCategories, newCategory],
        showBook:false,
        selectedCategories2:[...this.data.selectedCategories2,newCategory2]
      });
      console.log(this.data.selectedCategories2,"@");
      
      console.log(this.data.selectedCategories);
      
    }
  },
  removeCategory(e) {
    const { index } = e.currentTarget.dataset;
    const { selectedCategories,selectedCategories2 } = this.data;

    // 删除指定索引的种类
    selectedCategories.splice(index, 1);
    selectedCategories2.splice(index,1)
    // 更新数据
    this.setData({
      selectedCategories,
      selectedCategories2
    });
  },
  // 提交订单
async submitOrder() {
    const { name, phone, address, endTime, selectedCategories } = this.data;
    console.log(name, phone, address, endTime, selectedCategories);
    
    if (!name || !phone || !address || endTime.length == 0 || selectedCategories.length === 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }
    let wasteInfo = '';
    selectedCategories.forEach((element,index) => {
      if(index == 0){
        wasteInfo = wasteInfo+element;
      }
      wasteInfo = wasteInfo +";"+element;
    });
    const recyOrdObj = {
      name,
      phone,
      address,
      appointmentTime:endTime,
      wasteInfo,
      userId:userInfo.userId
    }
    const status = await insert(recyOrdObj);
    if(status == 1){
      wx.showToast({
        title: '预约成功',
        icon: 'success',
      });
      increment({metricType:'order_count',date:getCurrentDate(),increment:1})
      this.setData({success:true})
    }else{
      wx.showToast({
        title: '预约失败',
        icon: 'error',
      });
    }
    // 模拟提交逻辑
  },

  onSuccessClose(){
    this.setData({success:false})
  },
  onLoad() {
    this.setData({
      name: '',
      phone: '',
      address: '',
      show: false,
      region: ['请', '选择', '地址'],
      date: '2024-11-02',
      time: '14:00'
    })
  }
});
