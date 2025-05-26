Page({
  data: {
    latitude: 27.51743,
    longitude: 120.42631,
    markers: [
    ],
    covers: [{
      latitude: 27.51743,
      longitude: 120.42631,
      iconPath: '/image/location.png'
    }, {
      latitude: 27.51743,
      longitude: 121.42631,
      iconPath: '/image/location.png'
    }]
  },
  onLoad(e) {
    this.mapCtx = wx.createMapContext('myMap')
    console.log(this.mapCtx);
    this.getCenterLocation()
    this.moveToLocation()
    this.includePoints()
  },

  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success: res => {
        console.log(res.longitude)
        console.log(res.latitude)
        this.setData({ longitude: res.longitude, latitude: res.latitude })
        console.log(this.data.longitude, this.data.latitude);
      }
    })
    // this.moveToLocation()

  },
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints() {
    const latitude = this.data.latitude;
    const longitude = this.data.longitude;
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/search',
      method: 'GET',
      data: {
        key: '',
        keyword: '垃圾分类',
        boundary: `nearby(${latitude},${longitude},1000,1)`
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res.data.data)
        const markers = res.data.data.map((item, index) => ({
          id: Number(item.id), // 标记点的唯一 id
          latitude: item.location.lat, // 纬度
          longitude: item.location.lng, // 经度
          iconPath: '../../images/common/垃圾桶.png', 
          width: 30, // 图标宽度（单位：px）
          height: 30, // 图标高度（单位：px）
          callout: { // 可选，悬浮标签
            content: item.title, // 显示标题作为提示
            fontSize: 14,
            color: '#000000',
            bgColor: '#FFFFFF',
            padding: 5,
            borderRadius: 5,
            display: 'ALWAYS', // 始终显示
          },
        }));
        this.setData({ markers: markers })
      }
    })
  },
  onShow() {
    this.getCenterLocation()
    this.moveToLocation()
  },
})
