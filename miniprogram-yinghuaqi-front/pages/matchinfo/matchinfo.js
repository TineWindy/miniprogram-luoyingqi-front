// pages/matchinfo/matchinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

//获取匹配结果
function getMatchInfo(body) {
  httpFuncs.yhjRequest(
    '/user/getApplyInfo',
    '',
    function(res) {
      // 获取状态 
      var status = res.status;

      if (status == "MATCH_NO_VERIFY") {
        // TODO 提示用户去没有报名信息，需要验证
      } else if (status == "MATCH_NO_SUCCESS") {
        // TODO 提示用户匹配未成功
      } else if (status == "MATCH_CANCELED") {
        // TODO 提示用户匹配未成功
      } else if (status == "MATCH_SUCCESS") {
        // 渲染
        dataInit(res.lover);
      }

    },
    'GET'
  );
}

// 渲染
function dataInit(data) {

}


// 取消匹配
function cancelMatchInfo() {
  wx.showModal({
    title: '提示',
    content: '您正在取消您的匹配，请谨慎操作',
    success(res) {
      if (res.confirm) {
        httpFuncs.yhjRequest(
          '/user/cancelMatch',
          '',
          function(res) {
            wx.showModal({
              title: '取消成功',
              content: '您已取消此次匹配',
              showCancel: false,
            });

            //返回首页
            wx.reLaunch({
              url: '../qiyue/qiyue',
            })
          },
          'GET'
        );
      }
    }
  })
}

// 同意匹配
function agree() {
  httpFuncs.yhjRequest(
    '/user/agreeMatch',
    '',
    function(res) {
      wx.showModal({
        title: '操作成功',
        content: '您已同意此次匹配',
        showCancel: false,
      });
    },
    'GET'
  );
}