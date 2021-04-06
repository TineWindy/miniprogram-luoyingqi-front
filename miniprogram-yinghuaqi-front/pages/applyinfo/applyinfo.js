var httpFuncs = require("../../utils/HttpUtils.js");

Page({
  data: {
    isApplied: false,
    applySource: '',
    personalDescriptionArray: [],
    hardDemandArray: [],
    bonusDemandArray: [],
    bonusDemandWeightArray: [],
    version:'',
  },

  //初始加载用户报名信息
  onLoad: function (options) {
    this.setData({
      version: wx.getStorageSync('yhj_version')
    })

    getApplyInfo(this);
  },

  // 个人报名
  singleTap: function (e) {
    single(this, e);
  },

  // 组队报名
  groupTap: function (e) {
    group(this, e);
  },

  //取消报名
  bindCancel() {
    cancelApply();
  },
})

// 从后台获取报名信息
function getApplyInfo(body) {
  httpFuncs.yhjRequest(
    '/apply/getApplyInfo',
    '',
    function (res) {
      if (assertNotNull(res.resultObj)) {
        console.log(res.resultObj);
        body.setData({
          isApplied: true,
          applySource: res.resultObj.source,
          personalDescriptionArray: JSONObject2JSONArray(res.resultObj.personalDescription),
          hardDemandArray: JSONObject2JSONArray(res.resultObj.personalHardDemand),
          bonusDemandArray: JSONObject2JSONArray(res.resultObj.personalBonusDemand),
          bonusDemandWeightArray: JSONObject2JSONArray(res.resultObj.bonusDemandWeight)
        })

      }

    },
    'GET'
  );
}

function JSONObject2JSONArray(json) {
  var array = new Array();
  for (var key in json) {
    var data = {};
    data.questionValue = json[key];
    data.questionKey = key;

    array.push(data);
  }

  return array;
}

//判空
function assertNotNull(data) {
  if (typeof (data) == "undefined" || data == null || data === '') {
    return false;
  }

  if (data instanceof Array && data.length == 0) {
    return false;
  }

  return true;
}

// 跳转组队界面
function group(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming?source=' + 'TEAM',
  })
}

// 跳转个人报名界面
function single(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming?source=' + 'PERSONAL',
  })
}

// 取消报名
function cancelApply() {
  wx.showModal({
    title: '提示',
    content: '您正在取消您的报名，请谨慎操作',
    success(res) {
      if (res.confirm) {
        httpFuncs.yhjRequest(
          '/apply/cancel',
          '',
          function (res) {
            wx.showModal({
              title: '取消成功',
              content: '您已取消此次报名',
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
    }
  })
}