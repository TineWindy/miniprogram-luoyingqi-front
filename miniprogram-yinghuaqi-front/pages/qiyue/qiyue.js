//index.js
//获取应用实例
const app = getApp();
const ApiHost = app.globalData.ApiHost;
const HttpUtils = require("../../utils/HttpUtils.js");


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    apply_end_time: '',
    result_publish_time: '',
    week:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    day:["8","9","10","11","12","13","14","15","16","17","18","19","20"]
  },

  onLoad: function() {
    login();
    console.log(app.globalData)
  },

  onShareAppMessage: function(options){
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //跳转到相应专场的导航页面
  toNavigationPage:function(e){
    wx.navigateTo({
      url:'../navigation/navigation'
    })
  }
})

// 获取活动信息
function getActivityInfo(body) {
  httpFuncs.yhjRequest(
    "/version/getActivityInfo", {},
    function(res) {
      body.setData({
        apply_end_time: res.resultObj.time.APPLY_END_TIME,
        result_publish_time: res.resultObj.time.RESULT_PUBLISH_TIME,
      });
    },
    "get"
  );
}

// 获取用户微信信息
function getWxUserInfo(body) {
  if (app.globalData.userInfo) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  } else if (body.data.canIUse) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      body.setData({
        userInfo: res.userInfo,
        hasUserInfo: true
      })
    }
  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        body.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
}

function login(){
  HttpUtils.yhjRequest(
    '/user/login',
    '',
    function(res){
      console.log('登录成功');
    },
    'get'
  );
}