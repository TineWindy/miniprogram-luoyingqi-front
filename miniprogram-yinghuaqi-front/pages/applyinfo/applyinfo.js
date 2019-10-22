// pages/applyinfo/applyinfo.js
var httpFuncs = require("../../utils/HttpUtils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isApplied: false,
    hardDemandArray: [],
    bonusDemandArray: [],
    name: '',
    schoolNumber: '',
    college: '',
    qq: '',
    phone: '',
    gender: '',
    height: '',
    grade: '',
    living_location: '',
    appearance: '',
    relaxing_way: '',
    character: '',
    hobby: ''

  },

  // 立即报名
  applyTap: function(e) {
    apply(this, e);
  },

  // 快速验证
  verifyTap: function(e) {
    verify(this, e);
  },

  //取消报名
  bindCancel() {
    cancelApply();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApplyInfo(this);
  },
})

// 跳转报名界面
function apply(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming',
  })
}

// 跳转快速验证界面
function verify(body, e) {
  wx.navigateTo({
    url: '../verify/verify',
  })
}

//判空
function assertNotNull(data) {
  if (typeof(data) == "undefined" || data == null || data === '') {
    return false;
  }

  if (data instanceof Array && data.length == 0) {
    return false;
  }

  return true;
}

function getChineseWord(key) {
  switch (key) {
    case "NAME":
      return "姓名";
    case "SCHOOLNUMBER":
      return "学号";
    case "COLLEGE":
      return "学院";
    case "HEIGHT":
      return "身高";
    case "HEIGHT_MIN":
      return "身高最小值";
    case "HEIGHT_MAX":
      return "身高最大值";
    case "QQ":
      return "QQ";
    case "GENDER":
      return "性别";
    case "CHARACTER":
      return "性格";
    case "HOBBY":
      return "爱好";
    case "RELAXING_WAY":
      return "休闲方式";
    case "PHONE":
      return "手机号码";
    case "verifyCode":
      return "验证码";
    case "LIVING_LOCATION":
      return "所在学部";
    case "APPEARANCE":
      return "着装风格";
  }
}

function parseArrayValue(values) {
  var str = JSON.parse(values);

  if (str instanceof Array) {
    var string = "";
    for (var value of str) {
      string += value + "|"
    }

    return string;
  } else {
    return str;
  }

}

// 设置data里的硬性条件和加分项
function setPersonalDemand(demand, body) {
  console.log(demand);
  var personalDemand = JSON.parse(demand);

  // 解析硬性要求
  var hardDemand = personalDemand['HARD_DEMAND'];
  var hardDemandJson = JSON.parse(hardDemand);

  var hdArray = [];
  for (var key in hardDemandJson) {
    var data = {
      name: getChineseWord(key),
      value: parseArrayValue(hardDemandJson[key])
    }

    hdArray.push(data);
  }

  //解析加分要求
  var bonusDemand = personalDemand['BONUS_DEMAND'];
  var bonusDemandJson = JSON.parse(bonusDemand);

  var bdArray = [];
  for (var key in bonusDemandJson) {
    var dataJson = JSON.parse(bonusDemandJson[key]);

    var data = {
      name: getChineseWord(key),
      value: dataJson["BONUS_VALUE"],
      weight: dataJson["BONUS_WEIGHT"]
    }

    bdArray.push(data);
  }

  body.setData({
    hardDemandArray: hdArray,
    bonusDemandArray: bdArray
  })

}

// 从后台读取报名信息后显示在页面上
function dataInit(data, body) {
  console.log(data);
  if (assertNotNull(data)) {
    var personalDes = JSON.parse(data.personalDes);
    body.setData({
      isApplied: true,
      name: data.name,
      schoolNumber: data.schoolNumber,
      college: data.college,
      qq: data.qq,
      phone: data.phone,
      gender: data.gender,
      height: personalDes["HEIGHT"],
      grade: personalDes["GRADE"],
      living_location: personalDes["LIVING_LOCATION"],
      appearance: personalDes["APPEARANCE"],
      relaxing_way: parseArrayValue(personalDes["RELAXING_WAY"]),
      character: parseArrayValue(personalDes["CHARACTER"]),
      hobby: parseArrayValue(personalDes["HOBBY"])
    })

    setPersonalDemand(data.personalDemand, body);
  } else {
    body.setData({
      isApplied: false,
    })
  }
}

// 从后台获取报名信息
function getApplyInfo(body) {
  httpFuncs.yhjRequest(
    '/user/getApplyInfo',
    '',
    function(res) {
      dataInit(res.resultObj, body);
    },
    'GET'
  );
}

// 取消报名
function cancelApply() {
  httpFuncs.yhjRequest(
    '/user/cancelApply',
    '',
    function(res) {
      wx.showModal({
        title: '取消成功',
        content: '您已取消此次报名',
        showCancel: false,
      });

      //返回首页
      wx.reLaunch({
        url: '../qiyue/qiyue',
      })
    },
    'GET'
  );
}