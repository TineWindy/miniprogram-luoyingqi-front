// pages/personal/personal.js

var componentFuncs = require("../../utils/ComponentUtil.js");
var httpFuncs = require("../../utils/HttpUtils.js");
const qiniuUploader = require("../../utils/qiniuUploader");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //加分项权重
    normalSrc: '../../images/no-star.png',
    selectedSrc: '../../images/full-star.png',
    stars: [0, 1, 2, 3, 4],

    schoolKeyWord:'schoolcard',
    personalKeyWord:'personal',
    personalImageUrl:'',
    schoolCardImageUrl:'',

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
    makeupPicker: ["基本整洁（素颜）", "轻微留意（淡妆）", "非常看重（精致装扮）"],
    wearIndex: null,
    wearPicker: ["基本整洁（素颜）", "轻微留意（淡妆）", "非常看重（精致装扮）"],
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
    hardDemandCanSelect: false,
    hardDemandCheckbox: [{
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
    bonusDemandCanSelect: false,
    bonusDemandCheckbox: [{
        value: "身高",
        available: false
      },
      {
        value: "外表",
        available: false
      },
      {
        value: "课余休闲",
        available: false
      },
      {
        value: "性格特点",
        available: false
      },
      {
        value: "爱好",
        available: false
      },
    ],
    evaluate_contant: ["身高", "外表", "课余休闲", "性格特点", "爱好"],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/no-star.png',
    selectedSrc: '../../images/full-star.png',
    halfSrc: '../../images/half-star.png',
    score: 0,
    scores: [-1, -1, -1, -1, -1],
    anotherDateMethodCanSelect: false,
    anotherDateMethodCheckbox: [{
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
    anotherCharacterCanSelect: false,
    anotherCharacterCheckbox: [{
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
    anotherHobbyCanSelect: false,
    anotherHobbyCheckbox: [{
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
    anotherGradeCanSelect: false,
    anotherGradeCheckbox: [{
        value: "大一"
      },
      {
        value: "大二"
      },
      {
        value: "大三"
      },
      {
        value: "大四"
      },
      {
        value: "研究生"
      },
    ],
    anotherRegionCanSelect: false,
    anotherRegionCheckbox: [{
        value: "文理学部"
      },
      {
        value: "工学部"
      },
      {
        value: "信息学部"
      },
      {
        value: "医学部"
      },
    ],
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

  dateMethodSelected: function(e) {
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
    if (this.data.hobbyNum > 6) {
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

  hardDemandChange: function(e) {
    changeHardDemand(this, e);
  },
  hardDemandSelect: function(e) {
    this.setData({
      hardDemandCanSelect: true,
    });
  },
  hardDemandSelected: function(e) {
    this.setData({
      hardDemandCanSelect: false,
    });
  },

  bonusDemandChange: function(e) {
    changeBonusDemand(this, e);
  },
  bonusDemandSelect: function(e) {
    this.setData({
      bonusDemandCanSelect: true,
    });
  },
  bonusDemandSelected: function(e) {
    this.setData({
      bonusDemandCanSelect: false,
    });
  },

  anotherDateMethodSelect: function(e) {
    this.setData({
      anotherDateMethodCanSelect: true,
    });
  },
  anotherDateMethodSelected: function(e) {
    this.setData({
      anotherDateMethodCanSelect: false,
    });
  },
  anotherDateMethodChange: function(e) {
    changeAnotherDateMethod(this, e);
  },

  anotherCharacterChange: function(e) {
    changeAnotherCharacter(this, e);
  },
  anotherCharacterSelect: function(e) {
    this.setData({
      anotherCharacterCanSelect: true,
    });
  },
  anotherCharacterSelected: function(e) {
    this.setData({
      anotherCharacterCanSelect: false,
    });

  },

  anotherHobbyChange: function(e) {
    changeAnotherHobby(this, e);
  },
  anotherHobbySelect: function(e) {
    this.setData({
      anotherHobbyCanSelect: true,
    });
  },
  anotherHobbySelected: function(e) {
    this.setData({
      anotherHobbyCanSelect: false,
    });
  },

  anotherGradeChange: function(e) {
    changeAnotherGrade(this, e);
  },
  anotherGradeSelect: function(e) {
    this.setData({
      anotherGradeCanSelect: true,
    });
  },
  anotherGradeSelected: function(e) {
    this.setData({
      anotherGradeCanSelect: false,
    });
  },

  anotherRegionChange: function(e) {
    changeAnotherRegion(this, e);
  },
  anotherRegionSelect: function(e) {
    this.setData({
      anotherRegionCanSelect: true,
    });
  },
  anotherRegionSelected: function(e) {
    this.setData({
      anotherRegionCanSelect: false,
    });
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

  submitBaoming: function(e) {

    console.log(e);
    var map = e.detail.value;
    var data = this.data;



    // 将picker中的内容添加进map中this.wearPicker[this.wearIndex]
    map["APPEARANCE"] = data.wearPicker[data.wearIndex];
    map["GENDER"] = data.genderPicker[data.genderIndex];
    map["LIVING_LOCATION"] = data.regionPicker[data.regionIndex];
    map["GRADE"] = data.gradePicker[data.gradeIndex];

    // 若在加分项中选中了外表
    if (data.makeupIndex != null && data.bonusDemandCheckbox[1].available == true) {
      map["PB_APPEARANCE"] = data.makeupPicker[data.makeupIndex];
    }

    //添加个人和校园卡图片的url
    map["personalImageUrl"]=data.personalImageUrl;
    map["schoolCardImageUrl"]=data.schoolCardImageUrl;

    // 判断map中所有参数是否不合规
    for (var key in map) {
      if (!assertNotNull(map[key])) {
        wx.showModal({
          title: '数据错误',
          content: generateTips(key),
          showCancel: false,
        });

        return;
      }
    }

    submitApplyInformation(map);
  },

  //点击左边,半颗星
  selectStar: function(e) {
    console.log(e);
    var score = e.currentTarget.dataset.score;

    this.data.scores[e.currentTarget.dataset.idx] = score,
      this.setData({
        scores: this.data.scores,
        score: score
      })

  },

  //上传个人照片
  bindUploadPersonalImage:function(){
    chooseImage(this,this.data.personalKeyWord);
  },

  //上传校园卡照片
  bindUploadschoolCardImage: function () {
    chooseImage(this, this.data.schoolKeyWord);
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

// 改变课余休闲
function changeDateMethods(body, e) {
  var dateMethodsCheckbox = body.data.dateMethodsCheckbox;
  dateMethodsCheckbox = componentFuncs.limitCheckBox(e.detail.value, dateMethodsCheckbox, 3);
  body.setData({
    dateMethodsCheckbox: dateMethodsCheckbox,
  });
}

// 改变性格
function changeCharacter(body, e) {
  var characterCheckbox = body.data.characterCheckbox;
  characterCheckbox = componentFuncs.limitCheckBox(e.detail.value, characterCheckbox, 5);
  body.setData({
    characterCheckbox: characterCheckbox,
    characterNum: e.detail.value.length,
  });
}

// 改变爱好
function changeHobby(body, e) {
  var hobbyCheckbox = body.data.hobbyCheckbox;
  hobbyCheckbox = componentFuncs.limitCheckBox(e.detail.value, hobbyCheckbox, 5);
  body.setData({
    hobbyCheckbox: hobbyCheckbox
  });
}

// 改变硬性条件
function changeHardDemand(body, e) {
  var hardDmand = body.data.hardDemandCheckbox;
  for (var i = 0; i < hardDmand.length; i++) {
    hardDmand[i].available = false;
    for (var j = 0; j < e.detail.value.length; j++) {
      if (e.detail.value[j] == hardDmand[i].value) {
        hardDmand[i].available = true;
      }
    }
  }
  body.setData({
    hardDemandCheckbox: hardDmand,
  });
}

// 改变硬性条件：年级
function changeAnotherGrade(body, e) {
  var anotherGradeCheckbox = body.data.anotherGradeCheckbox;
  anotherGradeCheckbox = componentFuncs.limitCheckBox(e.detail.value, anotherGradeCheckbox, 10);
  body.setData({
    anotherGradeCheckbox: anotherGradeCheckbox,
  });
}

// 改变硬性条件：学部
function changeAnotherRegion(body, e) {
  var anotherRegionCheckbox = body.data.anotherRegionCheckbox;
  anotherRegionCheckbox = componentFuncs.limitCheckBox(e.detail.value, anotherRegionCheckbox, 10);
  body.setData({
    anotherRegionCheckbox: anotherRegionCheckbox,
  });
}

// 改变加分项
function changeBonusDemand(body, e) {
  var bonusDemand = body.data.bonusDemandCheckbox;
  for (var i = 0; i < bonusDemand.length; i++) {
    bonusDemand[i].available = false;
    for (var j = 0; j < e.detail.value.length; j++) {
      if (e.detail.value[j] == bonusDemand[i].value) {
        bonusDemand[i].available = true;
      }
    }
  }
  body.setData({
    bonusDemandCheckbox: bonusDemand,
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

// 改变加分项：课余休闲
function changeAnotherDateMethod(body, e) {
  var anotherDateMethodCheckbox = body.data.anotherDateMethodCheckbox;
  anotherDateMethodCheckbox = componentFuncs.limitCheckBox(e.detail.value, anotherDateMethodCheckbox, 3);
  body.setData({
    anotherDateMethodCheckbox: anotherDateMethodCheckbox,
  });
}

// 改变加分项：性格
function changeAnotherCharacter(body, e) {
  var anotherCharacterCheckbox = body.data.anotherCharacterCheckbox;
  anotherCharacterCheckbox = componentFuncs.limitCheckBox(e.detail.value, anotherCharacterCheckbox, 5);
  body.setData({
    anotherCharacterCheckbox: anotherCharacterCheckbox,
  });
}

// 改变加分项：爱好
function changeAnotherHobby(body, e) {
  var anotherHobbyCheckbox = body.data.anotherHobbyCheckbox;
  anotherHobbyCheckbox = componentFuncs.limitCheckBox(e.detail.value, anotherHobbyCheckbox, 5);
  body.setData({
    anotherHobbyCheckbox: anotherHobbyCheckbox
  });
}

// 获取验证码
function getVerifyCodeFunc(body, form) {
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

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
//填写提示生成
function generateTips(key) {
  if (key.indexOf("PD_") == 0) {
    var str = "您的硬性要求中该项不符合条件:"
    return str + getChineseWord(key.substr(3));
  } else if (key.indexOf("PB_") == 0) {
    var str = "您的加分要求中该项不符合条件:"
    return str + getChineseWord(key.substr(3));
  } else {
    var str = "您的个人描述中该项不符合条件:"
    return str + getChineseWord(key);
  }
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

function submitApplyInformation(map) {
  httpFuncs.yhjRequest(
    '/user/apply',
    map,
    function(res) {
      wx.showModal({
        title: '提示',
        content: '您已报名成功,是否查看报名信息',

        success(res) {
          if (res.confirm) {
            //跳转至报名详情页面
            wx.reLaunch({
              url: '../applyinfo/applyinfo'
            })
          } else {
            //返回首页
            wx.reLaunch({
              url: '../qiyue/qiyue',
            })
          }
        }
      })
    },
    'post'
  );
}

//获取域名
function getDomain(content){
  switch(content){
    case "schoolcard": return 'pzirthaju.bkt.clouddn.com';  
    case "personal": return 'pzirl3svw.bkt.clouddn.com';
  }
}


//生成token,并调用上传接口
function getToken(body,content,filePath){
  var getTokenUrl = app.globalData.ApiHost + '/user/getToken?content=' + content;

  wx.request({
    url: getTokenUrl,
    success(res){
      var token = res.data.uptoken;
      uploadImage(body,content,token,filePath);
    }
  })
}

//七牛云上传图片接口
function uploadImage(body, content, token, filePath){
  qiniuUploader.upload(filePath, (res) => {
    if(content==body.data.personalKeyWord){
      body.setData({
        personalImageUrl: res.imageURL,
      });
    } else if (content ==body.data.schoolKeyWord){
      body.setData({
        schoolCardImageUrl: res.imageURL,
      });
    }
  }, (error) => {
    wx.showToast({
      title: '图片上传失败，请稍后重试',
      icon: 'none',
      duration: 3000,
      mask: true
    })
  }, {
      region: 'SCN',
      domain: getDomain(content), // // bucket 域名
      uptoken: token, // 从指定 url 通过 HTTP GET 获取 uptoken
    }, (res) => {
    }, () => {
      // 取消上传
    }, () => {
      // `before` 上传前执行的操作
    }, (err) => {
      // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
    });
}

//选择图片
function chooseImage(body,content) {

  // 选择图片
  wx.chooseImage({
    count: 1,
    sourceType:['album'],
    success: function (res) {
      var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B                    
      //图片小于或者等于4M时 可以执行获取图片
      if(tempFilesSize>1024*1024*4){
        wx.showModal({
          title: '提示',
          content: '当前图片过大，请选择4M以下的图片',
          showCancel:false
        })
        return;
      }

      var filePath = res.tempFilePaths[0];
      
      getToken(body, content, filePath);
    }
  })
}