var httpFuncs = require("../../utils/HttpUtils.js");
var qiniuUploader = require("../../utils/qiniuUploader.js")
var app = getApp();

Page({
  data: {
    taskId: '',
    taskName: '今天是个好日子',
    taskContent: '今天的活动是要干什么呢',
    taskRule: '今天的活动要怎么进行呢',
    taskProfit: '今天的活动有什么奖励呢',
    uploadPic: '',
    score: '',
    taskPic: 'http://q0qwx6bsz.bkt.clouddn.com/taskpic.png',
  },

  uploadPic: function(e) {
    chooseImage(this, 'task');
  },

  confirmSubmit: function(e) {
    submit(this, e);
  },

  onLoad: function(e) {
    this.setData({
      taskId: e.taskId
    });
    var that = this;
    httpFuncs.yhjRequest(
      '/task/getTaskById', {
        taskId: e.taskId
      },
      function(res) {
        console.log(res);
        that.setData({
          taskName: res.resultObj.taskName,
          taskContent: res.resultObj.taskContent,
          taskRule: res.resultObj.taskRule,
          taskProfit: res.resultObj.taskProfit,
          uploadPic: res.resultObj.uploadPic,
          score: res.resultObj.score,
          taskPic: res.resultObj.taskPic,
        });
      }
    );
  },
})

function submit(body, e) {
  httpFuncs.yhjRequest(
    '/task/finishTask', {
      taskId: body.data.taskId,
      picUrl: body.data.taskPic
    },
    function(res) {
      wx.showModal({
        title: '操作成功',
        content: '上传图片成功',
      })
    },
    'GET'
  );
}

//生成token,并调用上传接口
function getToken(body, type, filePath) {
  var getTokenUrl = app.globalData.ApiHost + '/user/getToken?content=' + type;

  wx.request({
    url: getTokenUrl,
    success(res) {
      var token = res.data.uptoken;
      uploadImage(body, type, token, filePath);
    },
    fail() {
      uploadImageFail(body);
    }
  })
}

//七牛云上传图片接口
function uploadImage(body, type, token, filePath) {
  qiniuUploader.upload(filePath, (res) => {
    wx.showToast({
      title: '图片上传成功',
      icon: 'none',
      duration: 3000,
      mask: true
    })


    body.setData({
      taskPic: 'http://' + res.imageURL,
    });

    console.log(body.data.uploadPic);

  }, (error) => {
    uploadImageFail(body);
  }, {
    region: 'SCN',
    domain: body.data.uploadPic, // // bucket 域名
    uptoken: token, // 从指定 url 通过 HTTP GET 获取 uptoken
  }, (res) => {}, () => {
    // 取消上传
  }, () => {
    // `before` 上传前执行的操作
  }, (err) => {
    // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
  });
}

//选择图片
function chooseImage(body, type) {

  // 选择图片
  wx.chooseImage({
    count: 1,
    sourceType: ['album'],
    success: function(res) {
      var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B                    
      //图片小于或者等于4M时 可以执行获取图片
      if (tempFilesSize > 1024 * 1024 * 4) {
        wx.showModal({
          title: '提示',
          type: '当前图片过大，请选择4M以下的图片',
          showCancel: false
        })
        return;
      }
      var filePath = res.tempFilePaths[0];

      // 从后台获取上传凭证
      getToken(body, type, filePath);
    }
  })
}

function uploadImageFail(body) {
  wx.showToast({
    title: '图片上传失败，请稍后重试',
    icon: 'none',
    duration: 3000,
    mask: true
  })

  body.setData({
    personalImageSuccess: false,
    schoolCardImageSuccess: false,
  })
}