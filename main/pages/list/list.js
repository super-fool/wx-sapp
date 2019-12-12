// pages/list/list.js

const _testWorker = wx.createWorker("workers/test.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isVip: false,
    leftList: [], // 左侧列表
    rightList: [], // 右侧列表
    selectedTitle: "", // 右侧 选择 item
    leftCurrentItem: "" // 左侧 item 标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // _testWorker.postMessage({
    // msg: "欢迎各位领导莅临监督👏"
    // })
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
    // let demoList = this.getList(10);
    let demoList = Array.from({ length: 10 });
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
    this.createParentItemObserver(rightListLength + 1);
  },

  createParentItemObserver: function(observerID) {
    try {
      let itemObserver = wx.createIntersectionObserver();
      itemObserver
        .relativeTo(".scroll-list-right")
        .observe("#title-" + observerID, ({ id, intersectionRect }) => {
          if (intersectionRect.top !== 0 && intersectionRect !== 0) {
            console.log("%c【进入】" + id, "color:green; font-size: 20px");
            this.setData({
              leftCurrentItem: id
            });
          } else {
            console.log("%c【退出】" + id, "color:red; font-size: 20px");
          }
        });
    } catch (error) {
      console.log(error);
    }
  },

  // 生成随机列
  getList: function(num) {
    let list = [];
    for (let i = 0; i < num; i++) {
      list.push({
        height: this.getRandom(100)
      });
    }
    return list;
  },
  /**
   * 生成随机高度 < 300
   */
  getRandom: function(maxNum, minNum) {
    return parseInt(Math.random() * maxNum + minNum);
  }
});
