const HttpUtils = require("../../utils/HttpUtils");

// pages/navigation/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList:[{
      name:"报名开始时间",
      time:"2020/11/05"
    },{
      name:"匹配公布时间",
      time:"2020/11/13"
    },{
      name:"破冰晚会时间",
      time:"2020/11/13"
    },{
      name:"任务开始时间",
      time:"2020/11/11"
    },{
      name:"活动结束时间",
      time:"2020/11/13"
    }]
  },
  onLoad: function (options) {
    wx.setStorageSync('yhj_version', 'WHU-LOVER');
  },

  // 查看我的报名
  myApplyInfoTap: function(e) {
    getMyApplyInfo(this, e);
  },

  // 查看我的契约
  myMatchInfoTap: function(e) {
    getMyMatchInfo(this, e);
  },

  
  //暂无
  no:function(e){
    wx.showToast({
      title: '不在活动时间范围内~',
      icon:'none',
      duration:1500
    })
  }
})

// 获取报名信息
function getMyApplyInfo(body, e) {
  wx.navigateTo({
    url: '../applyinfo/applyinfo',
  })
}

// 获取契约信息
function getMyMatchInfo(body, e) {
  wx.navigateTo({
    url: '../matchinfo/matchinfo',
  })
}

function getVersionInfo(){

}