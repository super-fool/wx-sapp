// components/skeleton.js
// import SystemInfo from "../../libs/getSystemInfo.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    height: 0, //卡片高度，用来做外部懒加载的占位
    showSlot: true, //控制是否显示当前的slot内容
    skeletonId: ""
  },

  created() {
    //设置一个走setData的数据池
    this.extData = {
      itemObserver: null
    };
  },
  detached() {
    try {
      this.extData.itemObserver.disconnect();
    } catch (error) {}
    this.extData = null;
  },

  ready() {
    this.setData({
      skeletonId: this.randomString(8) //设置唯一标识
    });
    wx.nextTick(() => {
      // 修改了监听是否显示内容的方法，改为前后showNum屏高度渲染
      // 监听进入屏幕的范围relativeToViewport({top: xxx, bottom: xxx})
      //let info = wx.getStorageSync("SystemInfo");
      let { windowHeight = 667 } = wx.getSystemInfoSync();
      let showNum = 2; //超过屏幕的数量，目前这个设置是上下2屏
      try {
        this.extData.itemObserver = this.createIntersectionObserver();
        this.extData.itemObserver
          .relativeToViewport({
            top: showNum * windowHeight,
            bottom: showNum * windowHeight
          })
          .observe(`#list-item-${this.data.skeletonId}`, res => {
            let { intersectionRatio } = res;
            if (intersectionRatio === 0) {
              console.log(
                "【卸载】",
                this.data.skeletonId,
                "超过预定范围，从页面卸载"
              );
              this.setData({
                showSlot: false
              });
            } else {
              console.log(
                "【进入】",
                this.data.skeletonId,
                "达到预定范围，渲染进页面"
              );
              this.setData({
                showSlot: true,
                height: res.boundingClientRect.height
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 生成随机的字符串
     */
    randomString(len = 32) {
      var chars =
        "abcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      return Array.from({ length: len }, i =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
    }
  }
});
