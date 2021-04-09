var httpFuncs = require("../../../utils/HttpUtils");
Page({
  data: {
    backImgs: [
      '../../../images/button1.png',
      '../../../images/button2.png'
    ],
    backPic: '',
    taskList: [],
    timeList: []
  },
  toChild: function (e) {
    wx.navigateTo({
      url: '../singleTask/singleTask?taskId=' + e.currentTarget.dataset.taskid
    })
  },

  onLoad: function (e) {
    taskInit(this, e);
    
    var version = wx.getStorageSync('yhj_version');

    if (version.property.hasOwnProperty("taskTime")){
      this.setData({
        timeList: JSONObject2JSONArray(version.property.taskTime)
      })
    }
  },

  toOri: function (e) {
    wx.navigateTo({
      url: '../orienteering/orienteering'
    })
  },

  toPri: function (e) {
    wx.showToast({
      title: '访问权限不足',
      icon:'none',
      duration:2000
    })

    /*
    httpFuncs.yhjRequest(
      '/task/accessPrivate',
      '',
      function(res){
        
        if (res.resultObj ==="success"){
          wx.navigateTo({
            url: '../privatePage/privatePage'
          })
        }else{
          wx.showToast({
            title: '访问权限不足',
            icon:'none',
            duration:2000
          })
        }
      }
    )
    */
  },

})

function taskInit(body, e) {
  httpFuncs.yhjRequest(
    '/task/getAllTasks',
    '',
    function (res) {
      body.setData({
        taskList: res.resultObj,
      });
    },
    'get'
  );
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