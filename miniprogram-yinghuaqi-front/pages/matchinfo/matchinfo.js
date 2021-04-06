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
    contact: 'email:limingfu@whu.edu.cn.com',
    description: '欢迎加入珞樱契团队',
    status: '',
    selfApplyStatus: '',
    messsage: '',
    coupleNumber: '001',
    score: '99',
  },

  /** 接受按钮  */
  acceptTap: function (e) {
    var this_ = this;
    wx.showModal({
      title: '提示',
      content: '您正在接受契约，请谨慎操作!',
      success(res) {
        if (res.confirm) {
          agreeMatchInfo(this_);
        }
      }
    })

  },

  /** 拒绝按钮 */
  rejectTap: function (e) {
    wx.showModal({
      title: '提示',
      content: '您正在拒绝契约，请谨慎操作!',
      success(res) {
        if (res.confirm) {
          cancelMatchInfo();
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getMatchInfo(this);
  },
})

//获取匹配结果
function getMatchInfo(body) {
  httpFuncs.yhjRequest(
    '/match/getMatchResult',
    '',
    function (res) {
      body.setData({
        status: res.resultObj.matchStatus,
        name: res.resultObj.coupleName,
        contact: res.resultObj.coupleContact,
        description: res.resultObj.coupleDescription,
        score: res.resultObj.matchScore,
        coupleNumber: res.resultObj.coupleNumber,
        selfApplyStatus: res.resultObj.selfApplyInfoStatus,
        gender: res.resultObj.coupleGender
      })
    },
    'GET'
  );
}



// 取消匹配
function cancelMatchInfo() {
  httpFuncs.yhjRequest(
    '/match/cancelMatch',
    '',
    function (res) {
      wx.showModal({
        title: '取消成功',
        content: '您已取消此次匹配',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            //返回首页
            wx.reLaunch({
              url: '../navigation/navigation?version=' + JSON.stringify(wx.getStorageSync('yhj_version')),
            })
          }
        }
      });
    },
    'GET'
  );
}

// 同意匹配
function agreeMatchInfo(body) {
  httpFuncs.yhjRequest(
    '/match/agreeMatch',
    '',
    function (res) {
      wx.showModal({
        title: '操作成功',
        content: '您已同意此次匹配',
        showCancel: false,
      });

      getMatchInfo(body);
    },
    'GET'
  );
}