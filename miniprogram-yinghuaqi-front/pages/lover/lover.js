var httpFuncs = require("../../utils/HttpUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 暗恋报名
  sendSecretName: function(e) {
    secretApply(this, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})

// 暗恋报名
function secretApply(body, e) {
  httpFuncs.yhjRequest(
    '/user/secretLove',
    e.detail.value,
    function(res) {
      wx.showToast({
        title: '报名成功',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(
        function(params) {
          wx.reLaunch({
            url: '../qiyue/qiyue',
          });
        },
        2000
      );
    },
    'get'
  );
}