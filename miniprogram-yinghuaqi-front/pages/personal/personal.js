// pages/personal/personal.js

var componentFuncs = require("../../utils/ComponentUtil.js");
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeIndex: null,
    gradePicker: ["大一", "大二", "大三", "大四", "研究生"],
    genderIndex: null,
    genderPicker: ["男", "女"],
    regionIndex: null,
    regionPicker: ["文理学部", "工学部", "信息学部", "医学部"],
    dateMethodCanSelect: false,
    dateMethodsCheckbox: [{
        name: "movie",
        value: "看电影",
      },
      {
        name: "eat",
        value: "吃货",
      },
      {
        name: "ktv",
        value: "KTV",
      },
      {
        name: "hang",
        value: "闲逛",
      },
      {
        name: "study",
        value: "学习",
      },
      {
        name: "game",
        value: "游戏",
      },
      {
        name: "rest",
        value: "休息"
      }
    ],
    phoneNumber: '',
    getVerifyCode: true,
    makeupIndex: null,
    makeupPicker: ["淡妆", "素颜", "浓妆"],
    wearIndex: null,
    wearPicker: ["基本整洁", "稍稍留意一下穿搭", "注重衣着搭配"],
    characterCanSelect: false,
    characterNum: 0,
    characterCheckbox: [{
        value: "活泼",
      },
      {
        value: "稳重"
      },
      {
        value: "理性"
      },
      {
        value: "感性"
      },
      {
        value: "幽默"
      },
      {
        value: "正经"
      },
      {
        value: "粗线条"
      },
      {
        value: "敏感"
      },
      {
        value: "佛系"
      },
      {
        value: "较真"
      },
      {
        value: "粘人"
      },
      {
        value: "独处"
      },
      {
        value: "热闹"
      },
      {
        value: "文静",
      },
      {
        value: "A"
      },
      {
        value: "小受"
      }
    ],
    hobbyCanSelect: false,
    hobbyNum: 0,
    hobbyCheckbox: [{
        value: "二次元"
      },
      {
        value: "游戏"
      },
      {
        value: "体育"
      },
      {
        value: "影像"
      },
      {
        value: "舞蹈"
      },
      {
        value: "音乐"
      },
      {
        value: "文学"
      },
      {
        value: "吃货"
      },
      {
        value: "学习"
      },
      {
        value: "小动物"
      },
      {
        value: "天文"
      },
      {
        value: "科技"
      }
    ],
    hardDemandCheckbox: [
      {
        name: "grade",
        value: "年级",
        available: false
      },
      {
        name: "region",
        value: "学部",
        available: false
      },
      {
        name: "height",
        value: "身高",
        available: false
      },
    ],
    bonusDemandCheckbox: [],
  },

  gradePickerChange: function(e) {
    changeGrade(this, e);
  },

  genderPickerChange: function(e) {
    changeGender(this, e);
  },

  regionPickerChange: function(e) {
    changeRegion(this, e);
  },

  dateMethodSelect: function(e) {
    this.setData({
      dateMethodCanSelect: true,
    });
  },

  dateMethodSelected: function (e) {
    this.setData({
      dateMethodCanSelect: false,
    });
  },

  dateMethodsChange: function(e) {
    changeDateMethods(this, e);
  },

  makeupPickerChange: function(e) {
    changeMakeup(this, e);
  },

  wearPickerChange: function(e) {
    changeWear(this, e);
  },

  characterChange: function(e) {
    changeCharacter(this, e);
  },
  characterSelect: function(e) {
    this.setData({
      characterCanSelect: true,
    });
  },
  characterSelected: function(e) {
    if (this.data.characterNum < 5) {
      wx.showModal({
        title: '错误',
        content: '请选择五项内容',
      })
    } else {
      this.setData({
        characterCanSelect: false,
      });
    }
  },

  hobbyChange: function(e) {
    changeHobby(this, e);
  },
  hobbySelect: function(e) {
    this.setData({
      hobbyCanSelect: true,
    });
  },
  hobbySelected: function(e) {
    if (this.data.hobbyNum > 5) {
      wx.showModal({
        title: '错误',
        content: '请最多选择五项内容',
      })
    } else {
      this.setData({
        hobbyCanSelect: false,
      });
    }
  },

  // 获取验证码
  getVerifyCodeTap: function(e) {
    getVerifyCodeFunc(this, e);
  },
  getPhone: function(e) {
    this.setData({
      phoneNumber: e.detail.value,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})

// 改变年级
function changeGrade(body, e) {
  body.setData({
    gradeIndex: e.detail.value
  })
}

// 改变性别
function changeGender(body, e) {
  body.setData({
    genderIndex: e.detail.value
  })
}

// 改变学部
function changeRegion(body, e) {
  body.setData({
    regionIndex: e.detail.value
  })
}

// 改变约会方式
function changeDateMethods(body, e) {
  var dateMethodsCheckbox = body.data.dateMethodsCheckbox;
  console.log(e);
  dateMethodsCheckbox = componentFuncs.limitCheckBox(e.detail.value, dateMethodsCheckbox, 3);
  body.setData({
    dateMethodsCheckbox: dateMethodsCheckbox,
  });
}

// 改变性格
function changeCharacter(body, e) {
  var characterCheckbox = body.data.characterCheckbox;
  characterCheckbox = componentFuncs.limitCheckBox(e.detail.value, characterCheckbox, 5);
  console.log(characterCheckbox);
  body.setData({
    characterCheckbox: characterCheckbox,
    characterNum: e.detail.value.length,
  });
}

// 改变妆容
function changeMakeup(body, e) {
  body.setData({
    makeupIndex: e.detail.value
  })
}

// 改变穿搭
function changeWear(body, e) {
  body.setData({
    wearIndex: e.detail.value
  })
}

// 获取验证码
function getVerifyCodeFunc(body, form) {
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

  console.log("yeah");
  // 获取验证码
  if (mobile.test(body.data.phoneNumber)) {
    // 冻结前端获取验证码30s
    body.setData({
      getVerifyCode: false,
    });
    setTimeout(refreshVerifyCode, 3000, body);

    httpFuncs.yhjRequest(
      '/user/getVerifyCode', {
        phone: body.data.phoneNumber
      },
      function(res) {
        wx.showToast({
          title: '发送成功，请注意查收',
          icon: 'none',
          duration: 2000,
        });
      },
      'get'
    );
  } else {
    wx.showToast({
      title: '请输入正确电话号码',
      icon: 'none',
      duration: 2000,
    });
  }
}

function refreshVerifyCode(body) {
  body.setData({
    getVerifyCode: true,
  })
}