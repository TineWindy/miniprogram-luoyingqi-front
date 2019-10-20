const baseUrl = getApp().globalData.ApiHost

module.exports = {
  userLogin: userLogin,
  yhjRequest: yhjRequest,
}

// 登录方法
function userLogin() {
  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: baseUrl + '/user/loginin',
          method: 'GET',
          data: {
            userCode: res.code
          },
          success: function (res) {
            if (res.data.resultCode == 'SUCCESS') {
              // 将openId 与 session 存入本地存储和全局变量
              var openId = res.data.resultObj.user.openId;
              var session = res.data.resultObj.session;
              // 存入本地存储
              wx.setStorage({
                key: 'yhj_openId',
                data: openId,
              });
              wx.setStorage({
                key: 'yhj_session',
                data: session,
              });
            }
          }
        })
      }
    }
  })
}

// 通用http请求方法
function yhjRequest(url, params, success, method) {
  wx.showLoading({
    title: '加载中',
  });
  // base url
  let server = baseUrl;

  // 从存储中取出openId和session
  let openId = wx.getStorageSync("yhj_openId");
  let session = wx.getStorageSync("yhj_session");

  // 定义header
  var header = {
    'content-type': 'application/json',
    'session': session,
    'openId': openId,
  }


  let that = this;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: server + url,
      method: method,
      data: params,
      header: header,
      success: (res) => {
        wx.hideLoading();
        if (res.data.resultCode === 'USER_NOT_LOGIN_IN') {
          userLogin();
          setTimeout(function () {
            yhjRequest(url, params, success, method)
          }, 2000);
          resolve(null);
        } else if (res.data.resultCode !== 'SUCCESS') {
          wx.showModal({
            title: '小问题',
            content: res.data.resultDesc || '请求出错',
            showCancel: false,
          });
        } else {
          success(res.data);
        }
        resolve(res.data)
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(server + url)
        console.log(res);
        wx.showToast({
          title: '系统错误，请稍后重试',
          icon: 'none',
          duration: 2000,
          mask: true
        })
        reject(res.data)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
    .catch((res) => { })
}