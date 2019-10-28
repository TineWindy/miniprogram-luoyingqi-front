// pages/matchinfo/matchinfo.js
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    image: '',
    name: 'hxy',
    gender: 'MALE',
    grade: '大一',
    contact: 'qq 1670142089\nphone 15282329012',
    description: '他是微风有泪',
  },

  /** 接受按钮  */
  acceptTap: function(e) {
    agreeMatchInfo();
  },

  /** 拒绝按钮 */
  rejectTap: function(e) {
    cancelMatchInfo();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getMatchInfo(this);
  },
})

//获取匹配结果
function getMatchInfo(body) {
  httpFuncs.yhjRequest(
    '/user/getMatchInfo',
    '',
    function(res) {
      var data = res.resultObj;

      // 获取状态 
      var status = data.status;

      if (status == "MATCH_NO_VERIFY") {
        // TODO 提示用户去没有报名信息，需要验证
      } else if (status == "MATCH_NO_SUCCESS") {
        // TODO 提示用户匹配未成功
      } else if (status == "MATCH_CANCELED") {
        // TODO 提示用户匹配未成功
      } else if (status == "MATCH_SUCCESS") {
        // 渲染
        dataInit(data, body);
      }

    },
    'GET'
  );
}

// 渲染
function dataInit(data, body) {
  body.setData({
    name: data.loverName,
    gender: data.loverGender,
    grade: data.loverGrade,
    contact: data.loverContact,
    description: data.loverPersonalDesc,
    image: data.loverPhoto
  })
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
              success(res) {
                if (res.confirm) {
                  //返回首页
                  wx.reLaunch({
                    url: '../qiyue/qiyue',
                  })
                }
              }
            });
          },
          'GET'
        );
      }
    }
  })
}

// 同意匹配
function agreeMatchInfo() {
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