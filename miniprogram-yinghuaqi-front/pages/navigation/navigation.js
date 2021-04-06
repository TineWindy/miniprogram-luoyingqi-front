const HttpUtils = require("../../utils/HttpUtils");

// pages/navigation/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeList: []
  },
  onLoad: function (options) {
    var version =
      JSON.parse(options.version);

    wx.setStorageSync('yhj_version', version);

    if (version.property.hasOwnProperty('time')){
      this.setData({
        timeList: JSONObject2JSONArray(version.property.time)
      })
    }
  },

  // 查看我的报名
  myApplyInfoTap: function (e) {
    getMyApplyInfo(this, e);
  },

  // 查看我的契约
  myMatchInfoTap: function (e) {
    getMyMatchInfo(this, e);
  },

  //跳转到定向越野活动
  toOrienteering: function (e) {
    wx.navigateTo({
      url: '../task/taskNavigation/taskNavigation',
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

function JSONObject2JSONArray(json) {
  var array = new Array();

  for (var key in json) {
    var data = {};
    data.name = key;
    data.time = json[key];

    array.push(data);
  }

  return array;
}