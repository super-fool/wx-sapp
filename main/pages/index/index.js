//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
  },
  goList: function() {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  }
});
