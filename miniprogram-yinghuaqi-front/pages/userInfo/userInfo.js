const app = getApp()
const formatTime = require('../../utils/util')
const assertNotNull = require('../../utils/util')
const HttpUtils = require('../../utils/HttpUtils')

Page({
  data: {
    userInfo: {},
    genderList: ["男", "女"],
    genderIndex: 0,
    school: ["武汉大学"],
    schoolIndex: 0,
    college: ["计算机学院", "哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院", "马克思主义学院", "社会学院", "政治与公共管理学院", "信息管理学院", "数学与统计学院", "物理科学与技术学院",
      "化学与分子科学学院", "生命科学学院", "资源与环境科学学院", "动力与机械学院", "电气与自动化学院", "城市设计学院", "土木建筑工程学院", "水利水电学院", "电子信息学院", "测绘学院", "遥感信息工程学院", "印刷与包装系",
      "网络安全学院", "基础医学院", "健康学院", "药学院", "第一临床学院", "第二临床学院", "口腔医学院", "国际教育学院", "弘毅学堂"],
    collegeIndex: 0,
    isUpdating: false,
    name: '',
    qq: '',
    phone: '',
    schoolNumber: '',
    birthday: '',
    identifyCode:''
  },

  onLoad: function (options) {

    this.setData({
      userInfo: app.globalData.userInfo,
      birthday: formatTime.formatTime(new Date()),
      isUpdating: false
    })

    getUserBasicInfo(this,false);
  },

  onPullDownRefresh: function () {
    // 加载动画
    wx.showNavigationBarLoading();

    getUserBasicInfo(this,true);
  },

  //改变性别
  PickerChangeGender: function (e) {
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
    console.log(e);
    this.setData({
      birthday: e.detail.value
    })
  },
  //提交表单
  submitInfo: function (e) {
    var body = this;

    wx.showModal({
      title: '提示',
      content: '请您确保信息的真实性和有效性 \n 否则您可能将无法使用后续的功能!',
      success(res) {
        if (res.confirm) {
          postUserBasicInfo(e, body);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  updateInfo: function (e) {
    this.setData({
      isUpdating: true
    })

    wx.showToast({
      title: '现在可以修改啦~',
      icon: 'none',
      duration: 1000
    })
  }
})

// 简单审核信息完整性
function simpleCheckInfo(info) {
  var message = "";
  var error = false;

  if (!assertNotNull.assertNotNull(info.name)) {
    error = true;
    message += "姓名 ";
  }

  if (!assertNotNull.assertNotNull(info.qq)) {
    error = true;
    message += "QQ号 ";
  }

  if (!assertNotNull.assertNotNull(info.phone)) {
    error = true;
    message += "手机号 ";
  }

  if (!assertNotNull.assertNotNull(info.schoolNumber)) {
    error = true;
    message += "学号 ";
  }

  if (error) {
    message += "有误，请检查!";

    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false
    })

  }

  return error;

}

function postUserBasicInfo(e, body) {
  var form_data = e.detail.value;

  if (simpleCheckInfo(form_data)) {
    return;
  }

  HttpUtils.yhjRequest(
    '/user/updateUsrInfo',
    {
      name: form_data.name,
      gender: body.data.genderList[form_data.gender],
      birthday: form_data.birthday,
      qq: form_data.qq,
      phone: form_data.phone,
      school: body.data.school[form_data.school],
      college: body.data.college[form_data.college],
      schoolNumber: form_data.schoolNumber,
    },
    function (res) {
      wx.showModal({
        title: '提示',
        content: '修改成功!',
        showCancel: false
      })

      getUserBasicInfo(body,false);
    },
    'post'
  )

  body.setData({
    isUpdating: false
  })
}

function getUserBasicInfo(body, isRefresh) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
    
      body.setData({
        name: res.resultObj.name,
        genderIndex: findIdx(body.data.genderList, res.resultObj.gender),
        birthday: res.resultObj.birthday,
        qq: res.resultObj.qq,
        phone: res.resultObj.phone,
        schoolIndex: findIdx(body.data.school, res.resultObj.school),
        collegeIndex: findIdx(body.data.college, res.resultObj.college),
        schoolNumber: res.resultObj.schoolNumber,
        identifyCode: res.resultObj.identifyCode
      })

      if (isRefresh){
        wx.showToast({
          title: '刷新成功！',
          duration:2000
        });

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    },
    'get'
  )
}

function findIdx(list, value) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] == value) {
      return i;
    }
  }
}