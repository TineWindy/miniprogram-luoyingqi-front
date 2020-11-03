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
    getVersionInfo(this);
  },

  // 查看我的报名
  myApplyInfoTap: function (e) {
    getMyApplyInfo(this, e);
  },

  // 查看我的契约
  myMatchInfoTap: function (e) {
    getMyMatchInfo(this, e);
  },


  //暂无
  no: function (e) {
    wx.showToast({
      title: '不在活动时间范围内~',
      icon: 'none',
      duration: 1500
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

function getVersionInfo(body) {
  HttpUtils.yhjRequest(
    '/version/getActivityInfo',
    {'version':'WHU-LOVER'},
    function (res) {
      var version = res.resultObj.version;
      wx.setStorageSync('yhj_version', version);

      body.setData({
        timeList : JSONObject2JSONArray(res.resultObj.time)
      })
    }
  )
}

function JSONObject2JSONArray(json){
  var array= new Array();

  for(var key in json){
    var data = {};
    data.name = key;
    data.time = json[key];

    array.push(data);
  }

  return array;
}