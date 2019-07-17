// 全局实例
App({
  onLaunch(opts) {
    wx.login({
      success(res) {
        // 获取凭证
        let code = res.code;
        if (code) {
        }
      }
    });
  },
  onUnlaunch() {},
  onPageNotFound() {},
  onShow() {},
  onHide() {},
  onError() {},
  globalData: {
    // global variable
  }
});
