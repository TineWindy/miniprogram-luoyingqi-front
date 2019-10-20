var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
    getVerifyCode: true,
  },

  // 获取验证码
  getVerifyCodeTap: function (e) {
    getVerifyCodeFunc(this, e);
  },
  getPhone: function (e) {
    this.setData({
      phoneNumber: e.detail.value,
    });
  },

  // 提交验证
  sendVerifyCodeTap: function(e) {
    sendVerifyCode(this, e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})

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
    setTimeout(refreshVerifyCode, 3000, body);

    httpFuncs.yhjRequest(
      '/user/getVerifyCode', {
        phone: body.data.phoneNumber
      },
      function (res) {
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

// 提交验证码
function sendVerifyCode(body, e) {
  httpFuncs.yhjRequest(
    "/user/relateRegisterInfo",
    e.detail.value,
    function(res) {
      wx.redirectTo({
        url: '../applyinfo/applyinfo',
      });
    },
    'get'
  );
}
