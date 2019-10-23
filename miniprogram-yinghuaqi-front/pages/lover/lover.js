var httpFuncs = require("../../utils/HttpUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
    getVerifyCode: true,
  },

  // 获取验证码
  getVerifyCodeTap: function(e) {
    getVerifyCodeFunc(this, e);
  },
  getPhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value,
    });
  },

  // 暗恋报名
  sendSecretName: function(e) {
    secretApply(this, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})

// 暗恋报名
function secretApply(body, e) {
  wx.showModal({
    title: '提示',
    content: '确认后就无法再次报名，请谨慎操作！',
    success(res) {
      if (res.confirm) {
        // 确认后提交暗恋报名信息
        httpFuncs.yhjRequest(
          '/user/secretLove',
          e.detail.value,
          function(res) {
            wx.showToast({
              title: '报名成功',
              icon: 'none',
              duration: 2000,
            });
            setTimeout(
              function(params) {
                wx.reLaunch({
                  url: '../qiyue/qiyue',
                });
              },
              2000
            );
          },
          'get'
        );
      }

    }
  })
}

// 获取验证码
function getVerifyCodeFunc(body, form) {
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

  console.log("yeah");
  // 获取验证码
  if (mobile.test(body.data.phoneNumber)) {
    // 冻结前端获取验证码30s
    body.setData({
      getVerifyCode: false,
    });
    setTimeout(refreshVerifyCode, 30000, body);

    httpFuncs.yhjRequest(
      '/user/getVerifyCode', {
        phone: body.data.phoneNumber
      },
      function(res) {
        wx.showToast({
          title: '发送成功，请注意查收',
          icon: 'none',
          duration: 2000,
        });
      },
      'get'
    );
  } else {
    wx.showToast({
      title: '请输入正确电话号码',
      icon: 'none',
      duration: 2000,
    });
  }
}

function refreshVerifyCode(body) {
  body.setData({
    getVerifyCode: true,
  })
}