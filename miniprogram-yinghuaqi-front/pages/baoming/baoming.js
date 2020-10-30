const HttpUtils = require('../../utils/HttpUtils')
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

  3.onLoad的信息
    res={
      basicPersonalInfo：{}               //个人基本信息
      basicDescriptionList：[content,content,content]            //个人基本描述的问题列表
      hardRequirementsList：[content,content,content,content]            //个人硬性要求的问题列表
      extraRequirementsList：[content,content]           //个人加分要求的问题列表
    }
*/
Page({
  data: {
    source: '',                              //判断报名的类型
    basicPersonalInfo: {},                 //个人基本信息
    personalDescrption: [],
    hardDemand: [],
    bonusDemand: [],
    theOtherInfo: [{                   //组队报名另一半的信息填写
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
    }, {                   //组队报名另一半的信息填写
      id: '2',
      questionStyle: 'input',
      questionName: "Ta的契约码",
      remark: "",
      questionOptions: [],
      questionKey: "",
      questionOptionsMinLimit: 0,
      questionOptionsMaxLimit: 0,
      questionTotal: 0,
      questionFit: true,
      questionValue: null,
    }]
  },

  onLoad: function (options) {
    getUserBasicInfo(this);
    this.setData({
      source: options.source
    });

    getQustionsLists(this);
  },

  //用来实现模板事件发生时，页面data数据与模板data数据的同步更新，需要设置name和index内部标签数据，用来定位是哪个数据发生更新
  onComponentTap: function (e) {
    var indexTemp = e.currentTarget.dataset.index
    var nameTemp = e.currentTarget.dataset.name
    this.setData({
      [`${nameTemp}[${indexTemp}]`]: e.detail
    })
  },
  //提交按钮
  submit: function (e) {
    //前端数据整理 如果填写完整则返回数据结果，否则返回false
    var resultData = dataResult(this);

    if (resultData != false) {
      //发送post请求
      var src = this.data.source;

      if (src == 'PERSONAL'){
        postPersonalApplyInfo(resultData);
      }else if (src == 'TEAM'){
        postTeamApplyInfo(resultData);
      }else{
        wx.showModal({
          title: '提示',
          content: '报名失败!',
          showCancel: false
        })
      }
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
        showCancel: false
      })
    },
    'post'
  )
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
        showCancel: false
      })
    },
    'post'
  )
}

// 请求问题列表
function getQustionsLists(body) {
  HttpUtils.yhjRequest(
    '/question/getQuestions',
    { version: 'WHU-LOVER' },
    function (res) {
      var data = res.resultObj;

      // 渲染数据
      body.setData({
        personalDescrption: data.DESCRIPTION,
        hardDemand: data.HARD_DEMAND,
        bonusDemand: data.BONUS_DEMAND
      })
    }
  )
}


//前端数据整理
function dataResult(body) {
  var resultData = {
    DESCRIPTION: [],
    HARD_DEMAND: [],
    BONUS_DEMAND: []
  }

  if (judgeFit(body)) {
    resultData = bodyData2resultData(body, resultData)
    return resultData;
  } else {
    wx.showToast({
      title: '请先检查一下是否有未完成的问题哦~',
      icon: 'none'
    })
    return false
  }

}

//转换函数
function bodyData2resultData(body, resultData) {
  var personalDescrption_ = body.data.personalDescrption;
  var hardDemand_ = body.data.hardDemand;
  var bonusDemand_ = body.data.bonusDemand;

  for (var i = 0; i < personalDescrption_.length; i++) {
    resultData.DESCRIPTION.push({ [personalDescrption_[i].questionKey]: personalDescrption_[i].questionValue })
  }
  for (var i = 0; i < hardDemand_.length; i++) {
    resultData.HARD_DEMAND.push({ [hardDemand_[i].questionKey]: hardDemand_[i].questionValue })
  }
  for (var i = 0; i < bonusDemand_.length; i++) {
    resultData.BONUS_DEMAND.push({ [bonusDemand_[i].questionKey]: bonusDemand_[i].questionValue })
  }
  return resultData
}

//检查答案函数
function judgeFit(body) {
  var resultBoolen = true;

  var personalDescrption_ = body.data.personalDescrption;
  var hardDemand_ = body.data.hardDemand;
  var bonusDemand_ = body.data.bonusDemand;

  for (var i = 0; i < personalDescrption_.length; i++) {
    if (personalDescrption_[i].questionStyle == 'select') {
      if (personalDescrption_[i].questionTotal < personalDescrption_[i].questionOptionsMinLimit || personalDescrption_[i].questionTotal > personalDescrption_[i].questionOptionsMaxLimit) {
        body.setData({
          [`personalDescrption[${i}].questionFit`]: false
        })
        resultBoolen = false
      } else {
        body.setData({
          [`personalDescrption[${i}].questionFit`]: true
        })
      }
    } else {
      console.log(JSON.stringify(personalDescrption_[i].questionValue) == 'null');
      if (JSON.stringify(personalDescrption_[i].questionValue) == 'null') {
        body.setData({
          [`personalDescrption[${i}].questionFit`]: false
        })
        resultBoolen = false
      } else {
        body.setData({
          [`personalDescrption[${i}].questionFit`]: true
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
      } else {
        body.setData({
          [`hardDemand[${i}].questionFit`]: true
        })
      }
    } else {
      if (JSON.stringify(personalDescrption_[i].questionValue) == 'null') {
        body.setData({
          [`hardDemand[${i}].questionFit`]: false
        })
        resultBoolen = false
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
        resultBoolen = false
      } else {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: true
        })
      }
    } else {
      if (JSON.stringify(personalDescrption_[i].questionValue) == 'null') {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: false
        })
        resultBoolen = false
      } else {
        body.setData({
          [`bonusDemand[${i}].questionFit`]: true
        })
      }
    }
  }
  return resultBoolen
}