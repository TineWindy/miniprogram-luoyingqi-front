const HttpUtils = require('../../utils/HttpUtils');
const qiniuUploader = require('../../utils/qiniuUploader');
/*
  1.choice 组件模块的参数说明
    需要设置data-name和data-index和bindComponentTap来实现模板与页面data数据的同步更新
    content：Obj 问题对象{
      id:'1',                                                 ****问题的序号
      questionStyle:'select',                                          ****问题的类型   （select  input  picker）
      questionKey:"年级",                                      ****问题的英文描述，用来作为提交表单的key值，上一行的value作为其对应的value进行提交
      questionName:"您目前的在读学历是？(最少2项，最多4项)",              ****问题的题干
      remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",        ****问题的提示信息（仅在不定项选择题中出现）
      questionOptions:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"博士及以上",res:false}],    ****问题的选项（仅在不定项选择和列表选择中出现）
      questionOptionsMinLimit:2,                                                 ****最小选择数量（仅在不定项选择中使用，判断是否按要求填写报名表）
      questionOptionsMaxLimit:4,                                                 ****最大选择数量（仅在不定项选择中使用，判断是否按要求填写报名表）
      questionFit:true                                            ****是否满足了要求填写报名表单
      questionValue:null,                                             ****问题的答案，不定项选择是选中选项组成的数组，填空和列表为选中的答案的字符串格式
      questionTotal:0,                                               ****选中问题的数量（仅在不定项选择中使用，判断是否按要求填写报名表）
    }
  2.userInfo 组件模块的参数说明
    basicPersonalInfo：{}    后台返回的个人信息
*/
Page({
  data: {
    source: '', //判断报名的类型
    upLoadCfg: '',
    defaultUrl: 'i.loli.net/2020/11/03/bpWihgDE3zw96GN.png',
    selfSchoolCardUrl: '',
    selfSchoolCardState: true,
    selfPhotoUrl: '',
    selfPhotoState: true,
    coupleSchoolCardUrl: '',
    coupleSchoolCardState: true,
    verifyCode: '',
    verifyCodeState: true,
    basicPersonalInfo: {},
    personalDescription: [],
    hardDemand: [],
    bonusDemand: [],
    theOtherInfo: [{
      id: '1',
      questionStyle: 'input',
      questionName: "Ta的姓名",
      remark: "",
      questionOptions: [],
      questionKey: "",
      questionOptionsMinLimit: 0,
      questionOptionsMaxLimit: 0,
      questionFit: true,
      questionValue: null,
      questionTotal: 0
    }, { //组队报名另一半的信息填写
      id: '2',
      questionStyle: 'input',
      questionName: "Ta的个人标签",
      remark: "",
      questionOptions: [],
      questionKey: "",
      questionOptionsMinLimit: 0,
      questionOptionsMaxLimit: 0,
      questionTotal: 0,
      questionFit: true,
      questionValue: null,
    }],
    version: '',
  },

  onLoad: function (options) {
    getUserBasicInfo(this);

    var defaultUrl = this.data.defaultUrl;

    this.setData({
      source: options.source,
      version: wx.getStorageSync('yhj_version'),
      selfSchoolCardUrl: defaultUrl,
      selfPhotoUrl: defaultUrl,
      coupleSchoolCardUrl: defaultUrl
    });

    getQustionsLists(this);
    getToken(this);
  },

  //用来实现模板事件发生时，页面data数据与模板data数据的同步更新，需要设置name和index内部标签数据，用来定位是哪个数据发生更新
  onComponentTap: function (e) {
    var indexTemp = e.currentTarget.dataset.index
    var nameTemp = e.currentTarget.dataset.name
    this.setData({
      [`${nameTemp}[${indexTemp}]`]: e.detail
    })
  },
  //从模板获取验证码
  onGetVerifyCode: function (e) {
    this.setData({
      verifyCode: e.detail
    })
  },

  //上传图片
  upLoadImg: function (e) {
    var target = e.currentTarget.dataset.target;
    upLoadImages(this, this.data.upLoadCfg, target);
  },

  //提交按钮
  submit: function (e) {
    //前端数据整理 如果填写完整则返回数据结果，否则返回false
    var result = dataResult(this);

    if (!result.res) {
      wx.pageScrollTo({
        selector: result.data,
        duration: 0,
      })

      return;
    }

    // 判断来源
    var src = this.data.source;
    var resultData = result.data;

    if (src == 'PERSONAL') {
      // 将数据str化
      var dataMap = {};
      dataMap.personalDescription = resultData.personalDescription;
      dataMap.personalHardDemand = resultData.personalHardDemand;
      dataMap.personalBonusDemand = resultData.personalBonusDemand;
      dataMap.otherInfo = {
        'verifyCode': this.data.verifyCode,
        'photo': {
          'selfPhotoUrl': this.data.selfPhotoUrl,
          'selfSchoolCardUrl': this.data.selfSchoolCardUrl
        }

      };

      postPersonalApplyInfo(dataMap);
    } else if (src == 'TEAM') {
      var dataMap = {};

      // 补充验证信息
      resultData.selfPhoto = this.data.selfSchoolCardUrl;
      resultData.couplePhoto = this.data.coupleSchoolCardUrl;
      resultData.verifyCode = this.data.verifyCode;
      dataMap.otherInfo = resultData;

      postTeamApplyInfo(dataMap);

    } else {
      wx.showModal({
        title: '提示',
        content: '报名失败!',
        showCancel: false
      })
    }

  }
})

//获取个人(全部)基本信息
function getUserBasicInfo(body) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
      body.setData({
        basicPersonalInfo: res.resultObj
      })
    },
    'get'
  )
}

// 提交个人报名
function postPersonalApplyInfo(data) {

  HttpUtils.yhjRequest(
    '/apply/apply4personal',
    data,
    function (res) {
      wx.showModal({
        title: '提示',
        content: '报名成功, 请您留意后续的匹配结果!',
        showCancel: false,
        success(res) {
          subscribeMsg();
        }
      })
    },
    'post'
  )
}

// 接收订阅消息
function subscribeMsg() {
  wx.requestSubscribeMessage({
    tmplIds: ['8OdMwIP8UzRJpQMePQjBJUQRVwcfipAIfUyZehcQFUc'],
    success: function (res) {
    },
    fail: function (res) {
      console.log(res);
      if (res.errCode === 20004) {
        wx.showModal({
          title: '提示',
          content: '您已拒绝接收订阅消息！如想重新订阅，请前往设置页面设置',
          showCancel: false
        })
      }
    },
    complete: function (res) {
      //返回首页
      wx.reLaunch({
        url: '../navigation/navigation?version=' + JSON.stringify(wx.getStorageSync('yhj_version')),
      })
    }
  })
}

// 提交组队报名
function postTeamApplyInfo(data) {

  HttpUtils.yhjRequest(
    '/apply/apply4team',
    data,
    function (res) {
      wx.showModal({
        title: '提示',
        content: '组队报名成功, 请您留意后续的活动!',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            //返回首页
            wx.reLaunch({
              url: '../qiyue/qiyue',
            })
          }
        }
      })
    },
    'post'
  )
}

// 请求问题列表
function getQustionsLists(body) {
  HttpUtils.yhjRequest(
    '/question/getQuestions',
    '',
    function (res) {
      var data = res.resultObj;

      // 渲染数据
      body.setData({
        personalDescription: data.DESCRIPTION,
        hardDemand: data.HARD_DEMAND,
        bonusDemand: data.BONUS_DEMAND
      })
    }
  )
}

function getToken(body) {
  HttpUtils.yhjRequest(
    '/apply/getCfg',
    '',
    function (res) {
      body.setData({
        upLoadCfg: res.resultObj
      })
    },
    'get'
  )
}

// 上传图片
function upLoadImages(body, upLoadCfg, target) {
  // 选择图片
  wx.chooseImage({
    count: 1,
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilesSize = res.tempFiles[0].size; //获取图片的大小，单位B                    
      //图片小于或者等于4M时 可以执行获取图片
      if (tempFilesSize > 1024 * 1024 * 2) {
        wx.showModal({
          title: '提示',
          content: '当前图片过大，请选择2M以下的图片',
          showCancel: false
        })
        return;
      }
      var filePath = res.tempFilePaths[0];

      // 上传图片
      qiniuUploader.uploadImage(
        upLoadCfg.region,
        upLoadCfg.token,
        upLoadCfg.domain,
        filePath,
        function (res) {
          wx.showToast({
            title: '图片上传成功',
            icon: 'success'
          })

          if (target === 'selfPhoto') {
            body.setData({
              selfPhotoUrl: res.imageURL
            })
          } else if (target === 'coupleSchoolCard') {
            body.setData({
              coupleSchoolCardUrl: res.imageURL
            })
          } else if (target === 'selfSchoolCard') {
            body.setData({
              selfSchoolCardUrl: res.imageURL
            })
          }
        },
        function (error) {
          // 上传失败
          wx.showModal({
            title: '提示',
            content: '上传图片失败，请重试!',
            showCancel: false
          })
        }
      )

    }
  })
}


//前端数据整理
function dataResult(body) {
  if (body.data.source == 'PERSONAL') {
    var resultData = {
      personalDescription: {},
      personalHardDemand: {},
      personalBonusDemand: {}
    }

    var result = judgeFitPersonal(body);

    if (result.res) {
      resultData = bodyData2resultData(body, resultData)
      result.data = resultData;

      return result;
    } else {
      wx.showModal({
        title: '提示',
        content: '当前报名信息不符合要求，请您重新检查您的问卷(是否有被标红的问题)~',
        showCancel: false
      })

      return result;
    }
  } else if (body.data.source == 'TEAM') {
    var resultData = {
      coupleName: "",
      coupleIdentifyCode: ""
    }
    if (judgeFitTeam(body)) {
      resultData = bodyData2resultData(body, resultData);

      result.res = true;
      result.data = resultData;
    } else {
      wx.showModal({
        title: '提示',
        content: '当前报名信息不符合要求，请您重新检查您的问卷(是否有被标红的问题)~',
        showCancel: false
      })

      result.res = false;
      return result;
    }
  }
}

//个人报名转换函数
function bodyData2resultData(body, resultData) {
  if (body.data.source == 'PERSONAL') {
    var personalDescription_ = body.data.personalDescription;
    var hardDemand_ = body.data.hardDemand;
    var bonusDemand_ = body.data.bonusDemand;

    for (var i = 0; i < personalDescription_.length; i++) {
      var key = personalDescription_[i].questionKey;
      var v = personalDescription_[i].questionValue;

      if (assertStrNotEmpty(v)) {
        resultData.personalDescription[key] = v;
      }

    }

    for (var i = 0; i < hardDemand_.length; i++) {
      var key = hardDemand_[i].questionKey;
      var v = hardDemand_[i].questionValue;

      if (assertStrNotEmpty(v)) {
        resultData.personalHardDemand[key] = v;
      }
    }
    for (var i = 0; i < bonusDemand_.length; i++) {
      var key = bonusDemand_[i].questionKey;
      var v = bonusDemand_[i].questionValue;

      if (assertStrNotEmpty(v)) {
        resultData.personalBonusDemand[key] = v;
      }
    }

    return resultData
  } else if (body.data.source == 'TEAM') {
    resultData.coupleName = body.data.theOtherInfo[0].questionValue
    resultData.coupleIdentifyCode = body.data.theOtherInfo[1].questionValue
    return resultData
  }
}

function assertStrNotEmpty(str) {
  if (typeof (str) == undefined || str == null || str === "") {
    return false;
  }
  return true;
}

//组队报名检查函数
function judgeFitTeam(body) {
  var resultBoolen = true
  var other_ = body.data.theOtherInfo
  for (var i = 0; i < other_.length; i++) {
    console.log(JSON.stringify(other_[i].questionValue))
    if (JSON.stringify(other_[i].questionValue) == 'null') {
      body.setData({
        [`theOtherInfo[${i}].questionFit`]: false
      })
      resultBoolen = false
    } else {
      body.setData({
        [`theOtherInfo[${i}].questionFit`]: true
      })
    }
  }

  if (body.data.version.property.needVerfiyPhone && body.data.verifyCode.length == 0) {
    body.setData({
      verifyCodeState: false
    })
    resultBoolen = false
  } else {
    body.setData({
      verifyCodeState: true
    })
  }

  resultBoolen = resultBoolen && judgePhoto(body.data.selfSchoolCardUrl, 'selfSchoolCard', body) && judgePhoto(body.data.coupleSchoolCardUrl, 'coupleSchoolCard', body);

  return resultBoolen
}

//个人报名检查答案函数
function judgeFitPersonal(body) {
  var resultBoolen = true;
  var firstError = null;
  var personalDescription_ = body.data.personalDescription;
  var hardDemand_ = body.data.hardDemand;
  var bonusDemand_ = body.data.bonusDemand;

  for (var i = 0; i < personalDescription_.length; i++) {
    if (personalDescription_[i].questionStyle == 'select') {
      if (personalDescription_[i].questionTotal < personalDescription_[i].questionOptionsMinLimit || personalDescription_[i].questionTotal > personalDescription_[i].questionOptionsMaxLimit) {
        body.setData({
          [`personalDescription[${i}].questionFit`]: false
        })

        resultBoolen = false;

        if (firstError == null) {
          firstError = '#description';
        }

      } else {
        body.setData({
          [`personalDescription[${i}].questionFit`]: true
        })
      }
    } else {
      if (JSON.stringify(personalDescription_[i].questionValue) == 'null' || JSON.stringify(personalDescription_[i].questionValue).length == 2) {
        body.setData({
          [`personalDescription[${i}].questionFit`]: false
        })
        resultBoolen = false
        if (firstError == null) {
          firstError = '#description';
        }
      } else {
        body.setData({
          [`personalDescription[${i}].questionFit`]: true
        })
      }
    }
  }

  for (var i = 0; i < hardDemand_.length; i++) {
    if (hardDemand_[i].questionStyle == 'select') {
      if (hardDemand_[i].questionTotal < hardDemand_[i].questionOptionsMinLimit || hardDemand_[i].questionTotal > hardDemand_[i].questionOptionsMaxLimit) {
        body.setData({
          [`hardDemand[${i}].questionFit`]: false
        })

        resultBoolen = false

        if (firstError == null) {
          firstError = '#hardDemand';
        }
      } else {
        body.setData({
          [`hardDemand[${i}].questionFit`]: true
        })
      }
    } else {
      if (JSON.stringify(hardDemand_[i].questionValue) == 'null' || JSON.stringify(hardDemand_[i].questionValue).length == 2) {
        body.setData({
          [`hardDemand[${i}].questionFit`]: false
        })
        resultBoolen = false;

        if (firstError == null) {
          firstError = '#hardDemand';
        }
      } else {
        body.setData({
          [`hardDemand[${i}].questionFit`]: true
        })
      }
    }
  }

  for (var i = 0; i < bonusDemand_.length; i++) {
    if (bonusDemand_[i].questionStyle == 'select') {
      if (bonusDemand_[i].questionTotal < bonusDemand_[i].questionOptionsMinLimit || bonusDemand_[i].questionTotal > bonusDemand_[i].questionOptionsMaxLimit) {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: false
        })

        resultBoolen = false;

        if (firstError == null) {
          firstError = '#bonusDemand';
        }
      } else {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: true
        })
      }
    } else {
      if (JSON.stringify(bonusDemand_[i].questionValue) == 'null' || JSON.stringify(bonusDemand_[i].questionValue).length == 2) {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: false
        })
        resultBoolen = false;

        if (firstError == null) {
          firstError = '#bonusDemand';
        }
      } else {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: true
        })
      }
    }
  }
  if (body.data.version.property.needVerfiyPhone && body.data.verifyCode.length == 0) {
    body.setData({
      verifyCodeState: false
    })
    resultBoolen = false;
  } else {
    body.setData({
      verifyCodeState: true
    })
  }

  resultBoolen = resultBoolen && judgePhoto(body.data.selfPhotoUrl, 'selfPhoto', body) && judgePhoto(body.data.selfSchoolCardUrl, 'selfSchoolCard', body);

  var result = {
    res: resultBoolen,
    data: firstError
  }

  return result;
}

function judgePhoto(photo, target, body) {
  var result = true;
  if (photo === body.data.defaultUrl) {
    result = false;
  }

  if (target === 'selfPhoto') {
    body.setData({
      selfPhotoState: result
    })
  } else if (target === 'coupleSchoolCard') {
    body.setData({
      coupleSchoolCardState: result
    })
  } else if (target === 'selfSchoolCard') {
    body.setData({
      selfSchoolCardState: result
    })
  }

  return result;
}