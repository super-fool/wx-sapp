// components/oper-item/oper-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isChoose: true,
    chosenNum: 0
  },
  observers: {
    chosenNum: function(chosenNum) {
      if (chosenNum > 0) {
        this.setData({
          isChoose: false
        });
      } else {
        this.setData({
          isChoose: true
        });
      }
    }
  },
  methods: {
    operNum({ currentTarget }) {
      let operNum = this.data.chosenNum;
      currentTarget.dataset.operate
        ? this.setData({
            chosenNum: ++operNum
          })
        : this.setData({
            chosenNum: --operNum
          });
    }
  }
});
