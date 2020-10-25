// pages/navigation/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },
  // 查看我的报名
  myApplyInfoTap: function(e) {
    getMyApplyInfo(this, e);
  },

  // 查看我的契约
  myMatchInfoTap: function(e) {
    getMyMatchInfo(this, e);
  },

  //查看破冰晚会报名
  myIceBreakPartyTap:function(e){
    getMyIceBreakPartyInfo(this, e);
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

//获取破冰晚会信息
function getMyIceBreakPartyInfo(body, e){
  wx.navigateTo({
    url: '../iceBreak/iceBreak',
  })
}