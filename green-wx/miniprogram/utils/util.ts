export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function onTabClick(event: any) {
  const { index } = event.detail;
  // console.log('Tab clicked, index:', index);
  if (index == 0) {
    wx.switchTab({
      url: '/pages/index/index',
      success: function() {
        // console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  } else if (index == 1) {
    wx.switchTab({
      url: '/pages/orders/orders',
      success: function() {
        // console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  } else if (index == 2) {
    wx.switchTab({
      url: '/pages/personal/personal',
      success: function() {
        // console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });
  }
}
export function goto(k:number){
  console.log("goto",k);
  switch(k){
    case 1:
      wx.navigateTo({url: '/pages/classification/classification'});
      return;
    case 2:
      wx.navigateTo({url: '/pages/classification/classification'});
      return;
  }
}
export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
