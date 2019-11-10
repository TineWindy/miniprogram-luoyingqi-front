const app = getApp();
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  data: {
    backImgs: [
      'http://q0qwx6bsz.bkt.clouddn.com/taskpic.png',
      'http://q0qwx6bsz.bkt.clouddn.com/taskBack2.png',
      'http://q0qwx6bsz.bkt.clouddn.com/taskBack3.png'
    ],
    backPic: '',
    taskList: [{
      taskName: '任务列表'
    }]
  },

  toChild: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/singletask/singletask?taskId=' + e.currentTarget.dataset.taskid
    })
  },

  onLoad: function(e) {
    dataInit(this, e);
  }

})

function dataInit(body, e) {
  httpFuncs.yhjRequest(
    '/task/getAllTasks',
    '',
    function(res) {
      body.setData({
        taskList: res.resultObj,
      });
    },
    'get'
  );
}