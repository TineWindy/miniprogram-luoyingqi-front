const HttpUtils = require("../../../utils/HttpUtils");

// pages/privatePage/privatePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupleNumber: '',
    score: '',
    place: ['卓尔体育馆', '鲲鹏广场', '牌坊', '教五草坪', '万林博物馆外', '梅操', '马克思主义哲学院', '樱顶'],
    placeIndex: 0
  },

  scanCode: function () {
    var this_ = this;

    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        this_.setData({
          coupleNumber: res.result
        })
      }
    })
  },
  onLoad: function (options) {

  },

  PickerChangePlace: function (e) {
    this.setData({
      placeIndex: e.detail.value
    })
  },

  submit: function (e) {
    var this_ = this;
    if(this_.data.score >20 || this_.data.score < 0 || this_.data.score == ''){
      wx.showToast({
        title: '请输入正确的分数~',
        icon:'none'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '正在为' + this_.data.coupleNumber + '写入成绩，关卡:' + this_.data.place[this_.data.placeIndex],
      success(res) {
        if (res.confirm){
          HttpUtils.yhjRequest(
            'task/finishOri',
            {
              coupleNumber: this_.data.coupleNumber,
              taskId:  parseInt(this_.data.placeIndex) + 2,
              score: this_.data.score
            },
  
            function (res) {
              wx.showToast({
                title: '提交成功',
                duration: 2000
              })
            }
          )
        }
      
      }
    })
  },
  getScore:function(e){
    this.setData({
      score:e.detail.value
    })
  }
})