const HttpUtils = require("../../../utils/HttpUtils");
const { formatDetailTime } = require("../../../utils/util");

Page({
  data: {
    days: [],
    totalActivities: [],
    todayActivities: [],
    coupleNumber: '',
    userTaskInfo: {},
    scanTime: '',
    taskId: ''
  },

  scanCode: function () {
    this.reset();
    var this_ = this;
    var Time = formatDetailTime(new Date());

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        var coupleNumber = res.result;

        this_.setData({
          coupleNumber: coupleNumber,
          scanTime: Time,
        })

        getUserTaskInfo(coupleNumber, this_.data.taskId, this_);
      }
    })
  },


  bindPickerChange1: function (e) {
    var total = this.data.totalActivities;

    this.setData({
      index1: e.detail.value,
      todayActivities: total[e.detail.value],
      userTaskInfo: {}
    })
  },
  reset: function (e) {
    this.setData({
      userTaskInfo: {},
      coupleNumber: '',
      scanTime: '',
      index3: ''
    })
  },

  bindPickerChange2: function (e) {
    var today = this.data.todayActivities;

    this.setData({
      index2: e.detail.value,
      taskId: today[e.detail.value].id,
    })

    this.reset();
  },

  onLoad: function (options) {
    taskInit(this);
  },

  submit: function (e) {
    judge(this)
  },

  getScore: function (e) {
    this.setData({
      [`userTaskInfo.score`]: e.detail.value
    })
  },

  getPunlish: function (e) {
    this.setData({
      [`userTaskInfo.cheat`]: e.detail.value
    })
  },

  getCoupleNumber: function (e) {
    var Time = formatDetailTime(new Date());

    this.setData({
      coupleNumber: e.detail.value,
      scanTime: Time
    })
  }
})

//最后判断条件
function judge(body) {
  if (body.data.score > 100 || body.data.score < 0 || body.data.score == '') {
    wx.showToast({
      title: '请输入正确的分数~',
      icon: 'none'
    })
    return
  }
  wx.showModal({
    title: '提示',
    content: '正在为' + body.data.coupleNumber + '写入成绩',
    success(res) {
      if (res.confirm) {
        submit(body);
      }
    }
  })
}

function getUserTaskInfo(coupleNumber, taskId, body) {
  HttpUtils.yhjRequest(
    '/task/getUserTaskInfoByCode',
    {
      coupleNumber: coupleNumber,
      taskId: taskId
    },
    function (res) {
      var teamInfo = res.resultObj;
      var idx = '';

      if (typeof teamInfo != 'undefined') {
        body.setData({
          userTaskInfo: res.resultObj,
          index3: idx
        })
      }
    }
  )
}

function taskInit(body) {
  HttpUtils.yhjRequest(
    '/task/getAllTasks',
    '',
    function (res) {
      body.setData({
        days: res.resultObj.parents,
        totalActivities: res.resultObj.children
      });
    },
    'get'
  );
}

function submit(body) {
  var userTaskInfo = body.data.userTaskInfo;

  if (body.data.coupleNumber == '' || body.data.taskId == '') {
    wx.showModal({
      title: '警告',
      content: '无有效的契约编号或任务信息',
      showCancel: false
    })

    return;
  }

  // 一般活动
  if (userTaskInfo.status == 'STARTED') {
    userTaskInfo.taskFinishTime = body.data.scanTime;
  } else {
    userTaskInfo.taskStartTime = body.data.scanTime;
  }

  HttpUtils.yhjRequest(
    '/task/finishOfflineTask',
    {
      "version": wx.getStorageSync('yhj_version').version,
      "coupleNumber": body.data.coupleNumber,
      "taskId": body.data.taskId,
      "score": userTaskInfo.score,
      "taskStartTime": userTaskInfo.taskStartTime,
      "taskFinishTime": userTaskInfo.taskFinishTime,
      "cheat": userTaskInfo.cheat
    },
    function (res) {
      wx.showModal({
        title: '提示',
        content: '任务记录成功!',
        showCancel: false,
        success(res) {
          getUserTaskInfo(body.data.coupleNumber, body.data.taskId, body);
        }
      })
    },
    'post'
  )

}
