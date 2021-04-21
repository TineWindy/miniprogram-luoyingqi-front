var httpFuncs = require("../../../utils/HttpUtils.js");
var qiniuUploader = require("../../../utils/qiniuUploader.js")
var app = getApp();

Page({
  data: {
    taskId: '',
    taskKey:'',
    taskName: '今天是个好日子',
    taskDescription: '今天的活动是要干什么呢',
    taskRule: '今天的活动要怎么进行呢',
    taskProfit: '今天的活动有什么奖励呢',
    taskParticipateWay: '',
    taskInfoUrl: '',
    score: '暂无',
    taskPic: '',  //用户上传的图片链接
    upLoadCfg: '',
    withChildScores: []
  },

  uploadPic: function (e) {
    upLoadImages(this, this.data.upLoadCfg);
  },

  confirmSubmit: function (e) {
    var this_ = this;
    if (typeof (this_.data.taskPic) == 'undefined' || this_.data.taskPic == '') {
      wx.showModal({
        title: '提示',
        content: '您当前尚未上传图片，无法提交',
        showCancel: false
      })

      return;
    }
    wx.showModal({
      title: '提示',
      content: '您是否确定要提交图片？',
      success(res) {
        if (res.confirm) {
          submit(this_, e);
        }
      }
    })
  },

  onLoad: function (e) {
    this.setData({
      taskId: e.taskId
    });
    getTaskInfo(this);
  },

  toDetail: function (e) {
    toDetailArticle(this, e);
  }

})

//进入详情页面
function toDetailArticle(body, e) {
  // url较长,需要特殊处理
  var url = encodeURIComponent(JSON.stringify(body.data.taskInfoUrl));
  wx.navigateTo({
    url: '../../detail/detail?id=-1&url=' + url,
  })
}

function getTaskInfo(body) {
  httpFuncs.yhjRequest(
    '/task/getTaskById', {
    taskId: body.data.taskId
  },
    function (res) {
      body.setData({
        taskKey: res.resultObj.task.taskKey,
        taskName: res.resultObj.task.taskName,
        taskDescription: res.resultObj.task.taskDescription,
        taskRule: res.resultObj.task.taskRule,
        taskProfit: res.resultObj.task.taskProfit,
        taskPic: res.resultObj.taskPic,
        taskInfoUrl: res.resultObj.task.taskInfoUrl,
        taskParticipateWay: res.resultObj.task.taskParticipateWay,
        score: res.resultObj.taskScore,
      });

      if (res.resultObj.task.taskParticipateWay == 'ONLINE_UPLOAD') {
        getCfg(body);
      }

      if (res.resultObj.task.params.withChildScores == 'YES') {
        getChildTaskAndTeamTask(body);
      }


    }
  );
}

function getChildTaskAndTeamTask(body) {
  httpFuncs.yhjRequest(
    '/task/getChildTaskAndTeamTask',
    { taskKey: body.data.taskKey },

    function (res) {
      body.setData({
        withChildScores: res.resultObj
      })
    }

  )
}

function submit(body, e) {
  httpFuncs.yhjRequest(
    '/task/finishUpLoadTask', {
    taskId: body.data.taskId,
    pic: body.data.taskPic
  },
    function (res) {
      wx.showModal({
        title: '操作成功',
        content: '上传图片成功',
      })

      getTaskInfo(body);
    },
    'GET'
  );
}

function getCfg(body) {
  httpFuncs.yhjRequest(
    '/task/getCfg',
    '',
    function (res) {
      body.setData({
        upLoadCfg: res.resultObj
      })
    },
    'get'
  )
}

// 上传图片
function upLoadImages(body, upLoadCfg) {
  // 选择图片
  wx.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B                    
      //图片小于或者等于4M时 可以执行获取图片
      if (tempFilesSize > 1024 * 1024 * 4) {
        wx.showModal({
          title: '提示',
          content: '当前图片过大，请选择4M以下的图片',
          showCancel: false
        })
        return;
      }
      var filePath = res.tempFilePaths[0];

      // 上传图片
      qiniuUploader.uploadImage(
        upLoadCfg.region,
        upLoadCfg.token,
        upLoadCfg.domain,
        filePath,
        function (res) {
          wx.showToast({
            title: '图片上传成功',
            icon: 'success'
          })

          body.setData({
            taskPic: 'http://' + res.imageURL
          })
        },
        function (error) {
          // 上传失败
          wx.showModal({
            title: '提示',
            content: '上传图片失败，请重试!',
            showCancel: false
          })
        }
      )

    }
  })
}
