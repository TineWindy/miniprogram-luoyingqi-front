// pages/privatePage/privatePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupleNumber:'',
    place:'',
    score:'',
    place:['牌坊','奥场'],
    placeIndex:-1
  },

  scanCode: function() {
    var this_ = this;

    wx.scanCode({
      onlyFromCamera: true,
      success (res){
        this_.setData({
          coupleNumber:res.result
        })
      }
    })
  },
  onLoad: function (options) {

  },
  PickerChangePlace:function(e){
    this.setData({
      placeIndex:e.detail.value
    })
  }
})