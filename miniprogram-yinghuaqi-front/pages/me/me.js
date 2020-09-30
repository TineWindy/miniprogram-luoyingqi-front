const HttpUtils = require("../../utils/HttpUtils")

const app = getApp()
Page({
  data: {
    hasUser:false,
    userInfo:""
  },
  onLoad: function (options) {
    if(JSON.stringify(app.globalData.userInfo) != "null" ){
      this.setData({
        userInfo:app.globalData.userInfo,
        hasUser:true
      })
    }
  },
  //登陆接口
  signOn:function(e){
    app.globalData.userInfo = e.detail.userInfo
    this.onLoad()
  },
  //修改个人信息
  changeUserInfo:function(e){
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },

  aboutUs:function(e){
    wx.showToast({
      title: '敬请期待',
      duration:2000
    })
  }
})

