// pages/timeline/timeline.js
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")
var dayTime = require("../../utils/util.js")

Page({
  //页面的初始数据
  data: {
    tab:0,
    list: [{
      type:"新闻",
      source:"武汉大学学生会",
      title:"武汉大学入选2030年世界大学前十",
      time: "2020/01/28 11:24:53",
      text:"在2030年CN News等综合性大学排名中，武汉大学获得世界第7名，在中国排名第一",
      url:""
    },{
      type: "新闻",
      source: '大创',
      title: "互联网+大赛通知",
      time: "2020/01/27 17:54:53",
      text: "下面是互联网+大赛武汉大学校赛报名渠道，点击下方链接进行报名",
      url: ""
    }, {
      type: "新闻",
      source: '电气青年',
      title: "全国大学生数学建模大赛",
      time: "2020/01/27 16:54:53",
      text: "下面是大学生数学建模大赛校赛报名渠道，点击下方链接进行报名",
      url: ""
    }],
    list1: []
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    //调用接口获取数据
   


  },
  //进入详情页面
  toInfo: function() {

  },
  //改变tab页为“推荐”
  changeTabTo_0:function(){
    this.setData({
      tab:0
    })
  },
  //改变tab页为“活动”
  changeTabTo_1: function () {
    this.setData({
      tab: 1
    })
  }

})