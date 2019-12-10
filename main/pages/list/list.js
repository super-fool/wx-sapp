// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftList: [], // 左侧列表
    rightList: [], // 右侧列表
    selectedTitle: "", // 右侧 选择 item
    leftCurrentItem: "" // 左侧 item 标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadmore(); // 初始化加载数据
  },

  // 左侧item联动右侧item
  selectTitle: function({ target }) {
    this.setData({
      selectedTitle: target.dataset.title
    });
  },
  // 上拉加载
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
    try {
      let itemObserver = wx.createIntersectionObserver();
      itemObserver
        .relativeTo(".scroll-list-right")
        .observe(
          "#title-" + (rightListLength + 1),
          ({ id, intersectionRect }) => {
            if (intersectionRect.top !== 0 && intersectionRect !== 0) {
              console.log(
                "【进入】",
                id
              )
              this.setData({
                leftCurrentItem: id
              });
            } else {
              console.log(
                "【退出】",
                id
              )
            }
          }
        );
    } catch (error) {
      console.log(error);
    }
  },

  // 生成随机列
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
