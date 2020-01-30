// pages/timeline/timeline.js
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")
var dayTime = require("../../utils/util.js")

Page({
  //页面的初始数据
  data: {
    timeDay:'',
    timeSecond:'',
    timeWu:'',
    list:[{
      source:'大创',
      title:"互联网+大赛通知",
      time:"2020/01/27 17:54:53",
      timeDay:"",
      timeSecond:"",
      timeWu:"",
      text:"下面是互联网+大赛武汉大学校赛报名渠道，点击下方链接进行报名",
      url:""
    },{
        source: '电气青年',
        title: "全国大学生数学建模大赛",
        time: "2020/01/25 17:54:53",
        timeDay: "",
        timeSecond: "",
        timeWu: "",
        text: "下面是大学生数学建模大赛校赛报名渠道，点击下方链接进行报名",
        url:""
      }, {
        source: 'colorUI',
        title: "举个栗子",
        time: "2020/01/24 08:54:53",
        timeDay: "",
        timeSecond: "",
        timeWu: "",
        text: "这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ 在听到他的脚步声响在楼梯间的那一刻，我简直想要破门而出，对着他狠狠地吼上10分钟，然后再看心情要不要他进门。",
        url:""
      }],
      list1:[]
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    //调用接口获取数据


  
    //数据处理
    var list1=this.data.list.map(function(e){
      var timeWu="";
      var timeDay="";
      var timeSecond="";
      //获取时间
      //var time1 = dayTime.formatTime(e.time);
      timeDay = e.time.substring(0,10);
      timeSecond = e.time.substring(10,20);
      ////根据小时数判断上午/中午/下午+
      var h =e.time.substring(11,13);
      //e.time.getHours();
      if (0 <= h && h <= 6) {
          timeWu='凌晨'
      } else if (6 < h && h <= 11) {
          timeWu='上午'
      } else if (11 < h && h <= 15) {
          timeWu='中午'
      } else if (15 < h && h <= 18) {
          timeWu='下午'
      } else {
          timeWu='晚上'
      };
      return {
        source: e.source,
        title: e.title,
        time: e.time,
        timeDay: timeDay,
        timeSecond: timeSecond,
        timeWu: timeWu,
        text: e.text,
        url: e.url
      }
    })
    this.setData({
      list1:list1
    })
  },
  
  toInfo:function(){
    
  }
})
