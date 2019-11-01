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
  getVerifyCodeTap: function(e) {
    getVerifyCodeFunc(this, e);
  },
  getPhone: function(e) {
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
  onLoad: function(options) {

  },
})

// 获取验证码
function getVerifyCodeFunc(body, form) {
  var mobile = /^[1]([3-9])[0-9]{9}$/;

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

// 提交验证码
function sendVerifyCode(body, e) {
  httpFuncs.yhjRequest(
    "/user/fastVerify",
    e.detail.value,
    function(res) {
      wx.showModal({
        title: '成功',
        content: '电话验证成功，您可以查看自己的报名信息和匹配结果',
        success: function(e) {
          wx.reLaunch({
            url: '../qiyue/qiyue',
          });
        }
      })
    },
    'get'
  );
}