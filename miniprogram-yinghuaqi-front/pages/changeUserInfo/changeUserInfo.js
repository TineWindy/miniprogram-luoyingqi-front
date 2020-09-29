const app = getApp()
Page({
  data: {
    userInfo:{},
    gender:["男","女"],
    genderIndex:0,
    school:["武汉大学"],
    schoolIndex:0,
    college:["哲学学院","文学院","外国语言文学学院","新闻与传播学院","艺术学院","历史学院","经济与管理学院","法学院","马克思主义学院","社会学院","政治与公共管理学院","信息管理学院","数学与统计学院","物理科学与技术学院",
              "化学与分子科学学院","生命科学学院","资源与环境科学学院","动力与机械学院","电气与自动化学院","城市设计学院","土木建筑工程学院","水利水电学院","电子信息学院","计算机学院","测绘学院","遥感信息工程学院","印刷与包装系",
              "网络安全学院","基础医学院","健康学院","药学院","第一临床学院","第二临床学院","口腔医学院","国际教育学院","弘毅学堂"],
    collegeIndex:0,
    date:"2000-09-16"
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
  //改变生日
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //提交表单
  submitInfo:function(e){
    wx.showToast({
      title: '敬请期待~',
      icon:"none"
    })
  }
})