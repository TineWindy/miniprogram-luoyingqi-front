// pages/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 缘分降临
  applyTap: function(e) {
    apply(this, e);
  },

  // 暗恋通道
  loverTap: function(e) {
    lover(this, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})

// 跳转到报名界面
function apply(body, e) {
  wx.navigateTo({
    url: '../personal/personal',
  });
}

// 跳转到暗恋界面
function lover(body, e) {
  wx.navigateTo({
    url: '../lover/lover',
  })
}