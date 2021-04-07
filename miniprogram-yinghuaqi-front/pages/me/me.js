const HttpUtils = require("../../utils/HttpUtils")

const app = getApp()
Page({
  data: {
    hasUser: false,
    userInfo: ""
  },
  onLoad: function (options) {
    console.log(app.globalData);
    if (app.globalData.userWxInfo != null) {
      console.log('in');
      this.setData({
        userInfo: app.globalData.userWxInfo,
        hasUser: true
      })
    }
  },
  
  //登陆接口
  signOn: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo;
      this.onLoad();
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

  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        var userInfo = res.userInfo;

        this.setData({
          userInfo: userInfo,
          hasUser: true
        })

        HttpUtils.yhjRequest(
          '/user/updateUsrExtraInfo',
          {
            'ExtraInfo': JSON.stringify({
              'userWxInfo': userInfo
            })
          },
          function (res) {
          },
        )
      }
    })
  },

  aboutUs: function (e) {
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })

  }
})

