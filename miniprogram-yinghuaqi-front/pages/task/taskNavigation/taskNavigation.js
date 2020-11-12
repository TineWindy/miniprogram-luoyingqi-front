var httpFuncs = require("../../../utils/HttpUtils");
Page({
  data: {
    backImgs: [
      '../../../images/button1.png',
      '../../../images/button2.png'
    ],
    backPic: '',
    taskList: [{
      taskName: '这是一个任务'
    },{
      taskName: '这是一个任务'
    }],
    timeList:[]
  },
  toChild: function(e) {
    wx.navigateTo({
      url: '../singleTask/singleTask?taskId=' + e.currentTarget.dataset.taskid
    })
  },

  onLoad: function(e) {
    dataInit(this, e);
  },

  toOri: function(e){
    wx.navigateTo({
      url: '../orienteering/orienteering'
    })
  },

  toPri: function(e){
    wx.navigateTo({
      url: '../privatePage/privatePage'
    })
  },

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