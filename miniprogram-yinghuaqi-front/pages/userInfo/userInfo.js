const app = getApp()
const formatTime = require('../../utils/util')
const HttpUtils = require('../../utils/HttpUtils')

Page({
  data: {
    userInfo: {},
    genderList: ["男", "女"],
    genderIndex: 0,
    school: ["武汉大学"],
    schoolIndex: 0,
    college: ["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院", "马克思主义学院", "社会学院", "政治与公共管理学院", "信息管理学院", "数学与统计学院", "物理科学与技术学院",
      "化学与分子科学学院", "生命科学学院", "资源与环境科学学院", "动力与机械学院", "电气与自动化学院", "城市设计学院", "土木建筑工程学院", "水利水电学院", "电子信息学院",  "测绘学院", "遥感信息工程学院", "印刷与包装系",
      "网络安全学院", "基础医学院", "健康学院", "药学院", "第一临床学院", "第二临床学院", "口腔医学院", "国际教育学院", "弘毅学堂"],
    collegeIndex: 0,
    date: "2020-09-16",
    isUpdating: false,
    name: '',
    qq: '',
    phone: '',
    schoolNumber: ''
  },

  onLoad: function (options) {

    this.setData({
      userInfo: app.globalData.userInfo,
      date: formatTime.formatTime(new Date()),
      isUpdating: false
    })

    getUserBasicInfo(this);
  },

  onPullDownRefresh:function(){
    getUserBasicInfo(this);
  },

  //改变性别
  PickerChangeGender: function (e) {
    console.log(e);
    this.setData({
      genderIndex: e.detail.value
    })
  },
  //改变学校
  PickerChangeSchool: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  //改变学院
  PickerChangeCollege: function (e) {
    this.setData({
      collegeIndex: e.detail.value
    })
  },
  //改变生日
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //提交表单
  submitInfo: function (e) {
    console.log(e);
    var form_data=e.detail.value;

    HttpUtils.yhjRequest(
      '/user/updateUsrInfo',
      {
        name: form_data.name,
        gender: this.data.genderList[form_data.gender],
        birthday: form_data.birthday,
        qq:form_data.qq,
        phone:form_data.phone,
        school:this.data.school[form_data.school],
        college:this.data.college[form_data.college],
        schoolNumber:form_data.schoolNumber
      },
      function(res){
        wx.showToast({
          title: '修改成功',
          icon:'success',
          duration:3000
        })
      },
      'post'
    )

    this.setData({
      isUpdating:false
    })
  },

  updateInfo:function(e){
    this.setData({
      isUpdating:true
    })
  }
})

function getUserBasicInfo(body) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
      body.setData({
        name:res.resultObj.name,
        genderIndex:findIdx(body.data.genderList,res.resultObj.gender),
        birthday:res.resultObj.birthday,
        qq:res.resultObj.qq,
        phone:res.resultObj.phone,
        schoolIndex:findIdx(body.data.school,res.resultObj.school),
        collegeIndex:findIdx(body.data.college,res.resultObj.college),
        schoolNumber:res.resultObj.schoolNumber
      })
    },
    'get'
  )
}

function findIdx(list, value){
  for(var i = 0;i<list.length;i++){
    if(list[i]==value){
      return i;
    }
  }
}