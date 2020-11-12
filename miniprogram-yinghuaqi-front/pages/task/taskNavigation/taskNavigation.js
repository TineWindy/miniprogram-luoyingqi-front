var httpFuncs = require("../../../utils/HttpUtils");
Page({
  data: {
    backImgs: [
      'https://i03piccdn.sogoucdn.com/88eeb995a481bd4f',
      'https://i04piccdn.sogoucdn.com/46d11237e3fd5e0e',
      'https://i03piccdn.sogoucdn.com/88eeb995a481bd4f',
      'https://i04piccdn.sogoucdn.com/46d11237e3fd5e0e'
    ],
    backPic: '',
    taskList: [{
      taskName: '定向越野'
    },{
      taskName: '定向越野'
    },{
      taskName: '定向越野'
    }]
  },
  toChild: function(e) {
    wx.navigateTo({
      url: '../singleTask/singleTask?taskId=' + e.currentTarget.dataset.taskid
    })
  },

  onLoad: function(e) {
    //dataInit(this, e);
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