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
    type:'',                              //判断报名的类型
    basicPersonalInfo:{},                 //个人基本信息
    basicDescriptionList:[{               //个人基本描述
      id:'1',
      questionStyle:'select',
      questionName:"您目前的在读学历是？(最少2项，最多4项)",
      remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      questionOptions:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      questionKey:"年级",
      questionOptionsMinLimit:2,
      questionOptionsMaxLimit:4,
      questionTotal:0,
      questionFit:true,
      questionValue:null
      },{           
        id:'2',
        questionStyle:'input',
        questionName:"您对目标的描述？",
        remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",
        questionOptions:[],
        questionKey:"爱好",
        questionOptionsMinLimit:2,
        questionOptionsMaxLimit:4,
        questionTotal:0,
        questionFit:true,
        questionValue:null
        },{              
          id:'3',
          questionStyle:'picker',
          questionName:"对方的身高",
          remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",
          questionOptions:["150","151","162","170","174","180"],
          questionKey:"身高",
          questionOptionsMinLimit:2,
          questionOptionsMaxLimit:4,
          questionTotal:0,
          questionFit:true,
          questionValue:null
          }],
    hardRequirementsList:[{               //个人硬性要求
      id:'4',
      questionStyle:'select',
      questionName:"您目前的在读学历是？(最少2项，最多4项)",
      remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      questionOptions:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      questionKey:"年级",
      questionOptionsMinLimit:2,
      questionOptionsMaxLimit:4,
      questionTotal:0,
      questionFit:true,
      questionValue:null
      }],
    extraRequirementsList:[{               //个人加分要求
      id:'5',
      questionStyle:'select',
      questionName:"您目前的在读学历是？(最少2项，最多4项)",
      remark:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      questionOptions:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      questionKey:"年级",
      questionOptionsMinLimit:2,
      questionOptionsMaxLimit:4,
      questionTotal:0,
      questionFit:true,
      questionValue:null
      }],
    theOtherInfo:[{                   //组队报名另一半的信息填写
        id:'1',
        questionStyle:'input',
        questionName:"Ta的姓名",
        remark:"",
        questionOptions:[],
        questionKey:"",
        questionOptionsMinLimit:0,
        questionOptionsMaxLimit:0,
        questionFit:true,
        questionValue:null,                      
        questionTotal:0
    },{                   //组队报名另一半的信息填写
      id:'2',
      questionStyle:'input',
      questionName:"Ta的id",
      remark:"",
      questionOptions:[],
      questionKey:"",
      questionOptionsMinLimit:0,
      questionOptionsMaxLimit:0,
      questionTotal:0,
      questionFit:true,
      questionValue:null,
  }]
  },
  onLoad: function (options) {
    getUserBasicInfo(this)
    this.setData({
      type:options.type
    })
  },
  //用来实现模板事件发生时，页面data数据与模板data数据的同步更新，需要设置name和index内部标签数据，用来定位是哪个数据发生更新
  onComponentTap:function(e){
    var indexTemp = e.currentTarget.dataset.index
    var nameTemp = e.currentTarget.dataset.name
    this.setData({
      [`${nameTemp}[${indexTemp}]`]:e.detail
    })
  },
  //提交按钮
  submit:function(e){
    //前端数据整理 如果填写完整则返回数据结果，否则返回false
    var resultData = dataResult(this)
    console.log(resultData)
    //发送post请求
  }
})

//获取个人(全部)基本信息
function getUserBasicInfo(body) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
      body.setData({
        basicPersonalInfo:res.resultObj
      })
    },
    'get'
  )
}

//前端数据整理
function dataResult(body){
  var resultData = {basicDescriptionList:[],
    hardRequirementsList:[],
    extraRequirementsList:[]
  }
  if(judgeFit(body)){
    resultData = bodyData2resultData(body,resultData)
    return resultData
  } else{
    wx.showToast({
      title: '请先检查一下是否有未完成的问题哦~',
      icon:'none'
    })
    return false
  }
  
}

//转换函数
function bodyData2resultData(body,resultData){
  for(var i =0;i< body.data.basicDescriptionList.length;i++){
    resultData.basicDescriptionList.push({ [body.data.basicDescriptionList[i].questionKey] : body.data.basicDescriptionList[i].questionValue})
  }
  for(var i =0;i< body.data.hardRequirementsList.length;i++){
    resultData.hardRequirementsList.push({ [body.data.hardRequirementsList[i].questionKey] : body.data.hardRequirementsList[i].questionValue})
  }
  for(var i =0;i< body.data.extraRequirementsList.length;i++){
    resultData.extraRequirementsList.push({ [body.data.extraRequirementsList[i].questionKey] : body.data.extraRequirementsList[i].questionValue})
  }
  return resultData
}

//检查答案函数
function judgeFit(body){
  var resultBoolen = true
  for(var i =0;i<body.data.basicDescriptionList.length;i++){
    if(body.data.basicDescriptionList[i].questionStyle == 'select'){
      if(body.data.basicDescriptionList[i].questionTotal < body.data.basicDescriptionList[i].questionOptionsMinLimit || body.data.basicDescriptionList[i].questionTotal > body.data.basicDescriptionList[i].questionOptionsMaxLimit){
        body.setData({
          [`basicDescriptionList[${i}].questionFit`]:false
        })
        resultBoolen = false
      } else{
        body.setData({
          [`basicDescriptionList[${i}].questionFit`]:true
        })
      }
    } else{
      console.log(JSON.stringify(body.data.basicDescriptionList[i].questionValue) == 'null')
      if(JSON.stringify(body.data.basicDescriptionList[i].questionValue) == 'null' ){
        body.setData({
          [`basicDescriptionList[${i}].questionFit`]:false
        })
        resultBoolen = false
      }else{
        body.setData({
          [`basicDescriptionList[${i}].questionFit`]:true
        })
      }
    }
  }
  for(var i =0;i<body.data.hardRequirementsList.length;i++){
    if(body.data.hardRequirementsList[i].questionStyle == 'select'){
      if(body.data.hardRequirementsList[i].questionTotal < body.data.hardRequirementsList[i].questionOptionsMinLimit || body.data.hardRequirementsList[i].questionTotal > body.data.hardRequirementsList[i].questionOptionsMaxLimit){
        body.setData({
          [`hardRequirementsList[${i}].questionFit`]:false
        })
        resultBoolen = false
      }else{
        body.setData({
          [`hardRequirementsList[${i}].questionFit`]:true
        })
      }
    } else{
      if(JSON.stringify(body.data.basicDescriptionList[i].questionValue) == 'null'){
        body.setData({
          [`hardRequirementsList[${i}].questionFit`]:false
        })
        resultBoolen = false
      }else{
        body.setData({
          [`hardRequirementsList[${i}].questionFit`]:true
        })
      }
    }
  }
  for(var i =0;i<body.data.extraRequirementsList.length;i++){
    if(body.data.extraRequirementsList[i].questionStyle == 'select'){
      if(body.data.extraRequirementsList[i].questionTotal < body.data.extraRequirementsList[i].questionOptionsMinLimit || body.data.extraRequirementsList[i].questionTotal > body.data.extraRequirementsList[i].questionOptionsMaxLimit){
        body.setData({
          [`extraRequirementsList[${i}].questionFit`]:false
        })
        resultBoolen = false
      }else{
        body.setData({
          [`extraRequirementsList[${i}].questionFit`]:true
        })
      }
    } else{
      if(JSON.stringify(body.data.basicDescriptionList[i].questionValue) == 'null'){
        body.setData({
          [`extraRequirementsList[${i}].questionFit`]:false
        })
        resultBoolen = false
      }else{
        body.setData({
          [`extraRequirementsList[${i}].questionFit`]:true
        })
      }
    }
  }
  return resultBoolen
}