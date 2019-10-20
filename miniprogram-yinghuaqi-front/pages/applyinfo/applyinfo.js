// pages/applyinfo/applyinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isApplied: false,
  },

  // 立即报名
  applyTap: function(e) {
    apply(this, e);
  },

  // 快速验证
  verifyTap: function(e) {
    verify(this, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})

// 跳转报名界面
function apply(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming',
  })
}

// 跳转快速验证界面
function verify(body, e) {
  wx.navigateTo({
    url: '../verify/verify',
  })
}