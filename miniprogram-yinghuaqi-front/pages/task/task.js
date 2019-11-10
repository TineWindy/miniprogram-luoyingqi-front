const app = getApp();
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  data: {
    backPic: '',
    taskList: [{
      taskName: '任务列表',
      img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
      taskId: '/indexes/indexes',
    }, ]
  },

  toChild: function(e) {
    wx.navigateTo({
      url: '/pages/singletask/singletask?taskId=' + e.currentTarget.dataset.taskId
    })
  },

  onload: function(e) {
    dataInit(this, e);
  }

})

function dataInit(body, e) {
  httpFuncs.yhjRequest(
    '/task/getAllTaks',
    '',
    function(res) {
      body.setData({
        taskList: res,
      });
    },
    'get'
  );
}