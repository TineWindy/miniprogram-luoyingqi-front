const HttpUtils = require("../../utils/HttpUtils")

const app = getApp()
Page({
  data: {
    hasUser: false,
    userInfo: ""
  },
  onLoad: function (options) {
    if (JSON.stringify(app.globalData.userInfo) != "null") {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUser: true
      })
    }
  },
  //登陆接口
  signOn: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.onLoad()
    } else {
      wx.showToast({
        title: "登陆失败",
        icon: "none"
      })
    }
  },
  //修改个人信息
  changeUserInfo: function (e) {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },

  aboutUs: function (e) {
    HttpUtils.yhjRequest(
      '/aboutUs',
      '',
      function (res) {
        if (res.resultObj.url === "no" || res.resultObj.id === "-1") {
          wx.showToast({
            title: '敬请期待',
            icon: 'none',
            duration: 2000
          })
        } else {
          // url较长,需要特殊处理
          var url = encodeURIComponent(JSON.stringify(res.resultObj.url));
          var id = res.resultObj.id;
          wx.navigateTo({
            url: '../detail/detail?url=' + url + '&id=' + id,
          })
        }
      },
      'get'
    )

  }
})

