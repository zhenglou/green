Component({
  data: {
  },
  properties: {
    currentIndex:{
      type:Number
    },
    title1: {
      type: String,
      value: '首页'
    },
    title2: {
      type: String,
      value: '订单'
    },
    title3: {
      type: String,
      value: '个人中心'
    }
  },

  methods: {
    onTabClick(event: any) {
      // console.log(event)
      const index = event.currentTarget.dataset.index;
      this.triggerEvent('tabclick', { index });
    }
  }
});
