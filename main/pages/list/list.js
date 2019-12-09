// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secondList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmore(); // 初始化加载数据
  },

  loadmore: function() {
    let secondListLength = this.data.secondList.length;
    let nowList = `secondList[${secondListLength}]`;
    let demoList = this.getList(10);

    this.setData({
      [nowList]: {
        title: "title - " + (secondListLength + 1),
        item: demoList
      }
    });
    console.info('子列：%o', this.data.secondList);
  },
  getList: function(num) {
    let list = [];
    for (let i = 0; i < num; i++) {
      list.push({
        height: this.getRandomHeight()
      });
    }
    return list;
  },
  /**
   * 生成随机高度 < 300
   */
  getRandomHeight: function() {
    return parseInt(Math.random() * 100 + 200)
  }
})