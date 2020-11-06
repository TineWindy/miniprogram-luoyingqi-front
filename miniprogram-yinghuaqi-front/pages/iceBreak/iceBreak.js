const HttpUtils = require('../../utils/HttpUtils');
const { yhjRequest } = require('../../utils/HttpUtils');

Page({
  data: {
    isApplied: false,                   //是否报名
    basicPersonalInfo: {},             //个人信息
    personalId: '120',
    personalGender: 'male',
    verifyCode: '',
    verifyCodeState: true
  },

  onLoad: function (options) {
    getUserBasicInfo(this);
    getIceBreakApplyInfo(this);
  },

  //从模板获取验证码
  onGetVerifyCode: function (e) {
    this.setData({
      verifyCode: e.detail
    })
  },

  submit: function (e) {
    var this_ = this;
    if (this_.data.verifyCode.length == 0) {
      this_.setData({
        verifyCodeState: false
      });

      wx.showToast({
        title: '请输入验证码哦~',
        icon: 'none'
      })

      return;
    } else {
      this_.setData({
        verifyCodeState: true
      })

      // 准备数据
      var dataMap = {
        otherInfo: { 'verifyCode': this_.data.verifyCode }
      };

      wx.showModal({
        title: '提示',
        content: '请您确保报名以后会前往一见如故夜晚会现场',
        success: function (res) {
          if (res.confirm) {
            postIceBreakApplyInfo(this_, dataMap);
          }
        }
      })
    }

  },

  cancel: function (e) {
    wx.showModal({
      title: '提示',
      content: '您正在取消您的报名，请谨慎操作!',
      success: function (res) {
        if (res.confirm) {
          cancelIceBreakApplyInfo();
        }
      }
    })
  }
})

//获取个人(全部)基本信息
function getUserBasicInfo(body) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
      body.setData({
        basicPersonalInfo: res.resultObj
      })
    },
    'get'
  )
}

function getIceBreakApplyInfo(body, data) {
  HttpUtils.yhjRequest(
    '/apply/getIceBreakApplyInfo',
    data,
    function (res) {
      if (res.resultObj.isApplied === "yes") {
        body.setData({
          isApplied: true,
          personalGender: res.resultObj.personalGender,
          personalId: res.resultObj.personalId
        })
      } else {
        body.setData({
          isApplied: false
        })
      }
    },
    'get'

  )
}

function postIceBreakApplyInfo(body, data) {
  HttpUtils.yhjRequest(
    '/apply/apply4iceBreak',
    data,
    function (res) {
      wx.showModal({
        title: '提示',
        content: '报名成功!',
        showCancel: false
      })

      getIceBreakApplyInfo(body);
    },
    'post'

  )
}

function cancelIceBreakApplyInfo() {
  HttpUtils.yhjRequest(
    '/apply/cancelIceBreakApplyInfo',
    '',
    function (res) {
      wx.showModal({
        title: '提示',
        content: '取消报名成功!',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            //返回首页
            wx.reLaunch({
              url: '../qiyue/qiyue',
            })
          }
        }
      })

    }
  )
}