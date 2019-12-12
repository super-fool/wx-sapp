Component({
  properties: {
    isVip: {
      type: Boolean
    }
  },
  data: {
    subIndex: 0
  },
  attached() {
    let randomNum = this.getRandomTenNumber();
    this.setData({
      subIndex: randomNum
    })
  },
  methods: {
    // 随机生成 1-10
    getRandomTenNumber() {
      return parseInt(Math.random() * 10);
    }
  }
});
