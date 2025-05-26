import { increment } from "../../api/dailyStatistics"
import { getCurrentDate } from "../../utils/util"
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    leftWidth2: {
      type: String,
      value: ''
    },
    innerPaddingRight2: {
      type: String,
      value: ''
    },
    address: {
      type: String,
      value: ''
    },
    extClass: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1
    },
    search: {
      type: Boolean,
      value: false,
    },
    iconBackground: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: '',
    searchValue: '',
    garbageType: '',
    showPop: false
  } as {
    displayStyle: any
    searchValue: any
  },
  lifetimes: {
    attached() {
      const rect = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: (res) => {
          const isAndroid = res.platform === 'android'
          const isDevtools = res.platform === 'devtools'
          this.setData({
            ios: !isAndroid,
            innerPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
            leftWidth: `width: ${res.windowWidth - rect.left}px`,
            safeAreaTop: isDevtools || isAndroid ? `;height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
          })
        }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show: boolean) {
      const animated = this.data.animated
      let displayStyle = ''
      if (animated) {
        displayStyle = `opacity: ${show ? '1' : '0'
          };transition:opacity 0.5s;`
      } else {
        displayStyle = `display: ${show ? '' : 'none'}`
      }
      this.setData({
        displayStyle
      })
    },
    back() {
      const data = this.data
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta
        })
      }
      this.triggerEvent('back', { delta: data.delta }, {})
    },
    // 输入框输入事件
    onInputChange(event: any) {
      this.setData({
        searchValue: event.detail.value, // 将输入框的值同步到 data
        showPop: true
      });
      console.log(this.data.searchValue);
      this.wasteTypeDeepseek();
    },
    wasteTypeDeepseek() {
      wx.request({
        url: 'https://api.deepseek.com/chat/completions',
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ''
        },
        method: 'POST',
        data: {
          "model": "deepseek-reasoner",
          "messages": [
            { "role": "system", "content": "接下里请根据我给的物品名称来给出物品的垃圾类型，只要垃圾类型信息，其他的都不要" },
            { "role": "user", "content": this.data.searchValue }
          ],
          "stream": false
        },
        success: res => {
          console.log(res.data.choices[0].message.content);
          this.setData({ garbageType: res.data.choices[0].message.content })
          increment({ metricType: 'ai_usage', date: getCurrentDate(), increment: 1 })
        }
      })
    },
    onCloseGar() {
      this.setData({ garbageType: '', showPop: false, searchValue: '' })
    }
  },
})
