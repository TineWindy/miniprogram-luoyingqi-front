// pages/matchinfo/matchinfo.js
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: '../../images/baoming_sel_back.png',
    name: '珞樱契',
    gender: 'MALE',
    grade: '大一',
    contact: 'email:weifengyoulei@foxmail.com',
    description: '欢迎加入珞樱契团队',
    status: 'MATCH_NOT_VERIFY',
    message: '',
    coupleNumber: '001',
    score: '99',
  },

  /** 接受按钮  */
  acceptTap: function(e) {
    agreeMatchInfo(this);
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
      dataInit(res.resultObj, body);
    },
    'GET'
  );
}

// 渲染
function dataInit(data, body) {
  body.setData({
    status: data.status,
    message: data.message,
    name: data.loverName,
    gender: data.loverGender,
    grade: data.loverGrade,
    contact: data.loverContact,
    description: data.loverPersonalDesc,
    image: data.loverPhoto,
    coupleNumber: data.coupleNumber,
    score: data.score,
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
function agreeMatchInfo(body) {
  httpFuncs.yhjRequest(
    '/user/agreeMatch',
    '',
    function(res) {
      wx.showModal({
        title: '操作成功',
        content: '您已同意此次匹配',
        showCancel: false,
      });
      body.setData({
        status: 'MATCHED_RECEIVED',
      });
    },
    'GET'
  );
}