var httpFuncs = require("../../utils/HttpUtils.js");

Page({
  data: {
    isApplied: false,
    hardDemandArray: [{
      questionKey:"爱好",
      questionValue:["打篮球","跑步"]
    },{
      questionKey:"你的目标对象的体重比是多少",
      questionValue:"非常苗条"
    },{
      questionKey:"你的目标对象的家庭居住地的气候，天气，空气湿度，温度，空气粒子的要求？",
      questionValue:"要有火星的温度"
    }],
    bonusDemandArray: [{
      questionKey:"爱好",
      questionValue:["打篮球","跑步"]
    },{
      questionKey:"你的目标对象的体重比是多少",
      questionValue:"非常苗条"
    },{
      questionKey:"你的目标对象的家庭居住地的气候，天气，空气湿度，温度，空气粒子的要求？",
      questionValue:"要有火星的温度"
    }],
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
    hobby: '',

    // 加分项星星
    normalSrc: '../../images/no-star.png',
    selectedSrc: '../../images/full-star.png',
    stars: [0, 1, 2, 3, 4],
    score: '',
    scores: [],
  },

  //初始加载用户报名信息
  onLoad: function (options) {
    getApplyInfo(this);
  },
  
  // 个人报名
  singleTap: function(e) {
    single(this, e);
  },

  // 组队报名
  groupTap: function(e) {
    group(this, e);
  },

  //取消报名
  bindCancel() {
    cancelApply();
  },
})

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

// 从后台读取报名信息后显示在页面上
function dataInit(data, body) {
  if (assertNotNull(data)) {
    //  先设置基本信息
    body.setData({
      isApplied: true,
      name: data.name,
      schoolNumber: data.schoolNumber,
      college: data.college,
      qq: data.qq,
      phone: data.phone,
      gender: data.gender,
    })

    // 设置个人进一步信息
    if (assertNotNull(data.personalDes)) {
      var personalDes = JSON.parse(data.personalDes);

      body.setData({
        height: personalDes["HEIGHT"],
        grade: personalDes["GRADE"],
        living_location: personalDes["LIVING_LOCATION"],
        appearance: personalDes["APPEARANCE"],
        relaxing_way: parseDataValue(personalDes["RELAXING_WAY"]),
        character: parseDataValue(personalDes["CHARACTER"]),
        hobby: parseDataValue(personalDes["HOBBY"])
      })
    }

    // 设置个人要求
    if (assertNotNull(data.personalDemand)) {
      setPersonalDemand(data.personalDemand, body);
    }

  } else {
    body.setData({
      isApplied: false,
    })
  }
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

// 将每一项的数据解析成一般格式
function parseDataValue(values) {
  var string = "";
  if (values.indexOf("[") == 0) {
    var str = JSON.parse(values);

    if (str instanceof Array) {
      for (var value of str) {
        string += value + "|"
      }
    }
  } else if (values.indexOf("{") == 0) {
    //身高
    var str = JSON.parse(values);

    var min = str["MIN"];
    var max = str["MAX"];

    string = min + "~" + max;
  } else {
    string = values;
  }
  return string;
}

// 设置data里的硬性条件和加分项
function setPersonalDemand(demand, body) {
  var personalDemand = JSON.parse(demand);

  // 解析硬性要求
  var hardDemand = personalDemand['HARD_DEMAND'];
  var hardDemandJson = JSON.parse(hardDemand);

  var hdArray = [];
  for (var key in hardDemandJson) {
    var data = {
      name: getChineseWord(key),
      value: parseDataValue(hardDemandJson[key])
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
      value: parseDataValue(dataJson["BONUS_DEMAND_VALUE"]),
      weight: dataJson["BONUS_DEMAND_WEIGHT"]
    }

    bdArray.push(data);
  }

  body.setData({
    hardDemandArray: hdArray,
    bonusDemandArray: bdArray
  })

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
      return "学部";
    case "APPEARANCE":
      return "着装风格";
    case "GRADE":
      return "年级"
  }
}

// 跳转快速验证界面
function group(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming?source='+'TEAM',
  })
}

// 跳转报名界面
function single(body, e) {
  wx.navigateTo({
    url: '../baoming/baoming?source='+'PERSONAL',
  })
}

// 取消报名
function cancelApply() {
  wx.showModal({
    title: '提示',
    content: '您正在取消您的报名，请谨慎操作',
    success(res) {
      if (res.confirm) {
        httpFuncs.yhjRequest(
          '/user/cancelApply',
          '',
          function(res) {
            wx.showModal({
              title: '取消成功',
              content: '您已取消此次报名',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  //返回首页
                  wx.reLaunch({
                    url: '../qiyue/qiyue',
                  })
                }
              }
            });
          },
          'GET'
        );
      }
    }
  })
}