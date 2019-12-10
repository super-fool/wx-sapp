// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
    selectedTitle: "",
    leftCurrentItem: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmore(); // 初始化加载数据
  },
  selectTitle: function({ target }) {
    this.setData({
      selectedTitle: target.dataset.title
    });
  },
  loadmore: function() {
    let rightListLength = this.data.rightList.length;
    let rightNowList = `rightList[${rightListLength}]`;
    let leftNowList = `leftList[${rightListLength}]`;
    let demoList = this.getList(10);
    this.setData({
      [rightNowList]: {
        title: "title-" + (rightListLength + 1),
        item: demoList
      },
      [leftNowList]: {
        title: "title-" + (rightListLength + 1),
        id: rightListLength
      }
    });

    let itemObserver = wx.createIntersectionObserver();
    itemObserver
      .relativeTo(".scroll-list-right")
      .observe("#title-" + (rightListLength + 1), res => {
        console.log(res);
      });
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
    return parseInt(Math.random() * 100 + 200);
  }
});
