const HttpUtils = require('../../utils/HttpUtils')
/*

  1.choice 组件模块的参数说明
    用法一：报名信息的收集
    需要设置data-name和data-index和bindComponentTap来实现模板与页面data数据的同步更新
    content：Obj 问题对象{
      id:'1',                                                 ****问题的序号
      type:'select',                                          ****问题的类型   （select  input  picker）
      stem:"您目前的在读学历是？(最少2项，最多4项)",              ****问题的题干
      remarks:"我们承诺不会外泄您的姓名，仅供结果集去使用",        ****问题的提示信息（仅在不定项选择题中出现）
      options:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"博士及以上",res:false}],    ****问题的选项（仅在不定项选择和列表选择中出现）
      value:null,                                             ****问题的答案，不定项选择是选中选项组成的数组，填空和列表为选中的答案的字符串格式
      valueTitle:"年级",                                      ****问题的英文描述，用来作为提交表单的key值，上一行的value作为其对应的value进行提交
      total:0,                                               ****选中问题的数量（仅在不定项选择中使用，判断是否按要求填写报名表）
      min:2,                                                 ****最小选择数量（仅在不定项选择中使用，判断是否按要求填写报名表）
      max:4,                                                 ****最大选择数量（仅在不定项选择中使用，判断是否按要求填写报名表）
      mandatory:true,                                        ****是否为必填题
      fit:true                                              ****是否满足了要求填写报名表单
    }
    用法二：基本信息展示（不可编辑）
    basic：true
    basicPersonalInfo：{}    后台返回的个人信息

    2.onLoad的信息
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
      type:'select',
      stem:"您目前的在读学历是？(最少2项，最多4项)",
      remarks:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      options:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      value:[],
      valueTitle:"年级",
      total:0,
      min:2,
      max:4,
      mandatory:true,
      fit:true
      },{
        id:'5',
        type:'select',
        stem:"您目前的在读学历是？(最少2项，最多4项)",
        remarks:"我们承诺不会外泄您的姓名，仅供结果集去使用",
        options:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
        value:[],
        valueTitle:"年级",
        total:0,
        min:2,
        max:4,
        mandatory:true,
        fit:true
      },{
      id:'2',
      type:'input',
      stem:"姓名",
      remarks:"",
      options:[],
      value:"",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }],
    hardRequirementsList:[{               //个人硬性要求       
      id:'3',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }],
    extraRequirementsList:[{              //个人加分要求
      id:'8',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    },{
      id:'9',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }],
    theOtherInfo:[{                    //组队报名另一半的信息填写
        id:'1',
        type:'input',
        stem:"Ta的姓名",
        remarks:"",
        options:[],
        value:"",
        total:0,
        min:0,
        max:0,
        mandatory:true,
        fit:true
    },{
      id:'2',
      type:'input',
      stem:"Ta的id",
      remarks:"",
      options:[],
      value:"",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
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
    console.log(e)
    var indexTemp = e.currentTarget.dataset.index
    var nameTemp = e.currentTarget.dataset.name
    this.setData({
      [`${nameTemp}[${indexTemp}]`]:e.detail
    })
  },
  //提交按钮
  submit:function(e){
    //判断是否有必选题未填写 返回判断结果（布尔值）
    var resultBool = judgeFit(this)   
    //提醒用户提交
    //信息整合，将后端需要的信息包装
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
//判断是否有必选题未填写
function judgeFit(body){
  //循环个人基本描述
  for(var i=0;i<body.data.basicDescriptionList.length;i++){
    if(!body.data.basicDescriptionList[i].fit && body.data.basicDescriptionList[i].mandatory){
      return false
    }
  }
  //循环个人硬性要求  
  for(var i=0;i<body.data.hardRequirementsList.length;i++){
    if(!body.data.hardRequirementsList[i].fit && body.data.basicDescriptionList[i].mandatory){
      return false
    }
  }
  //循环个人加分要求
  for(var i=0;i<body.data.extraRequirementsList.length;i++){
    if(!body.data.extraRequirementsList[i].fit && body.data.basicDescriptionList[i].mandatory){
      return false
    }
  }
  return true
}