// components/fun-diy/fun-diy.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 矩形类型 0 上下 1 左右 2 右左
    selected:{
      type:Number,
      value:0
    },
    imageSrc:{
      type:String,
      value:''
    },
    widthDiy:{
      type:String,
      value:'70px'
    },
    heightDiy:{
      type:String,
      value:'70px'
    },
    fontSizeDiy:{
      type:String,
      value:'14px'
    },
    colorDiy:{
      type:String,
      value:'#FFFFFF'
    },
    backgroundDiy:{
      type:String,
      value:'30px'
    },
    iconWidthDiy:{
      type:String,
      value:'30px'
    },
    iconHeightDiy:{
      type:String,
      value:'30px'
    },
    paddingDiy:{
      type:String,
      value:''
    },
    title:{
      type:String,
      value:''
    },
    iconMarginDiy:{
      type:String,
      value:''
    },
    titleMarginDiy:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})