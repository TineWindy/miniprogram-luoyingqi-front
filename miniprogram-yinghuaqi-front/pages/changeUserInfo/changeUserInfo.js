const app = getApp()
Page({
  data: {
    userInfo:{},
    gender:["男","女"],
    genderIndex:0,
    school:["武汉大学","华中科技大学","华中师范大学","武汉理工大学"],
    schoolIndex:0,
    college:["电气与自动化学院","计算机学院","电子信息学院","新闻与传播学院","经济与管理学院"],
    collegeIndex:0
  },
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  //改变性别
  PickerChangeGender:function(e){
    this.setData({
      genderIndex:e.detail.value
    })
  },
  //改变学校
  PickerChangeSchool:function(e){
    this.setData({
      schoolIndex:e.detail.value
    })
  },
  //改变性别
  PickerChangeCollege:function(e){
    this.setData({
      collegeIndex:e.detail.value
    })
  },
  //提交表单
  submitInfo:function(e){
    wx.showToast({
      title: '修改成功',
    })
  }
})