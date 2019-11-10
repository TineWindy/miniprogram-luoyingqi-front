var httpFuncs = require("../../utils/HttpUtils.js");
Page({
  data: {
    taskId: '',
    taskName: '今天是个好日子',
    taskContent: '今天的活动是要干什么呢',
    taskRule: '今天的活动要怎么进行呢',
    taskProfit: '今天的活动有什么奖励呢',
    uploadPic: 'yhj',
    score: '',
    taskPic: ''
  },

  uploadPic: function(e) {
    chooseImage(this, '');
  },

  confirmSubmit: function(e) {
    submit(this, e);
  },

  onLoad: function (e) {
    this.setData({
      taskId: e.taskId
    });
    httpFuncs.yhjRequest(
      '/task/getTaskById',
      {
        taskId: e.taskId
      },
      function(res) {
        this.setData({
          taskName: res.taskName,
          taskContent: res.taskContent,
          taskRule: res.taskRule,
          taskProfit: res.taskProfit,
          uploadPic: res.uploadPic,
          score: res.score,
          taskPic: res.taskPic,
        });
      }
    );
  },
})

function submit(body, e) {
  httpFuncs.yhjRequest(
    '/task/finishTask',
    {
      taskId: body.data.taskId,
      picUrl: taskPic
    },
    function(res) {
      wx.showModal({
        title: '操作成功',
        content: '上传图片成功',
      }),
      wx.redirectTo({
        url: 'pages/singletask/singletask',
      })
    },
    'GET'
  );
}

//获取域名
function getDomain(type) {
  // todo 
  return '';
}
//生成token,并调用上传接口
function getToken(body, type, filePath) {
  var getTokenUrl = app.globalData.ApiHost + '/user/getToken?type=' + type;

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
      taskPic: res.imgUrl,
    });

  }, (error) => {
    uploadImageFail(body);
  }, {
      region: 'SCN',
      domain: getDomain(type), // // bucket 域名
      uptoken: token, // 从指定 url 通过 HTTP GET 获取 uptoken
    }, (res) => { }, () => {
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
    success: function (res) {
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