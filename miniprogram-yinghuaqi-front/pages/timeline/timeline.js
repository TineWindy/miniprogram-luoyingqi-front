// pages/timeline/timeline.js
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")
var dayTime = require("../../utils/util.js")

Page({
  //页面的初始数据
  data: {
    itemChooce:["推送","推广"],
    TabCur: 0,
    scrollLeft:0,
    page: 0,
    list: [],
    recommendList:[{type:"武汉大学",startShowTime:"Yesterday",coverPicture:"http://stc.zjol.com.cn/g1/M001ADBCggSDljh3V2ABu4uAACHhmjTrNk798.jpg?width=720&height=528",title:"i了i了,武汉大学2020级研究生开学典礼来袭！",introduction:"珞珈山下一段青春，强国路上一生奋斗"},
    {type:"武汉大学",startShowTime:"Yesterday",coverPicture:"http://stc.zjol.com.cn/g1/M001ADBCggSDljh3V2ABu4uAACHhmjTrNk798.jpg?width=720&height=528",title:"i了i了,武汉大学2020级研究生开学典礼来袭！",introduction:"珞珈山下一段青春，强国路上一生奋斗"},
    {type:"武汉大学",startShowTime:"Yesterday",coverPicture:"http://stc.zjol.com.cn/g1/M001ADBCggSDljh3V2ABu4uAACHhmjTrNk798.jpg?width=720&height=528",title:"i了i了,武汉大学2020级研究生开学典礼来袭！",introduction:"珞珈山下一段青春，强国路上一生奋斗"}]
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    //getTotalList(this);
  },
  //切换头部TAB
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      page: 0
    });
    //getTotalList(this);
  },

  //触底加载
  onReachBottom: function() {
    //getMoreList(this);
  },

  //进入详情页面
  toDetail: function(e) {
    toDetailTimelineInfo(this, e)
  }
})

//获取数据列表
function getTotalList(body) {
  let nextPage = parseInt(body.data.page) + 1;

  httpFuncs.yhjRequest(
    '/timeline/getAllTimeline', {
      page: body.data.page
    },
    function(res) {
      let _list = res.resultObj.map(e => showTimelineInfo(e))
      body.setData({
        list: _list,
        page: nextPage
      })
    },
    'GET'
  );
}

//触底增加list数据
function getMoreList(body) {
  let oldList = body.data.list;

  if (oldList.length <= 100) {
    let nextPage = parseInt(body.data.page) + 1;

    httpFuncs.yhjRequest(
      '/timeline/getAllTimeline', {
        page: body.data.page
      },
      function(res) {
        let _list = res.resultObj.map(e => showTimelineInfo(e))
        body.setData({
          list: oldList.concat(_list),
          page: nextPage
        })
      },
      'GET'
    );
  } else {
    wx.showToast({
      title: '我也是有底线滴',
      icon: 'none'
    })
  }
}

//进入详情页面
function toDetailTimelineInfo(body, e) {
  var id = e.currentTarget.id
  wx.navigateTo({
    url: '../detail/detail?id=' + id,
  })
}

// 展示timeline的信息
function showTimelineInfo(e) {

  // 处理发布时间
  let _publishTime = timeProcess(e.publishTime);

  return {
    id: e.id,
    digest: e.digest,
    contentUrl: e.contentUrl,
    publishTime: _publishTime,
    source: e.source,
    title: e.title,
    type: e.type
  }
}

// 时间处理
function timeProcess(time) {
  // 首先对时间进行处理
  time = time.replace(/-/g, '/');

  let date = new Date(time);
  let nowDate = new Date();
  let _time = "";

  // 特殊处理昨天和今天的时间
  if (date.getFullYear() == nowDate.getFullYear() && date.getMonth() == nowDate.getMonth()) {
    if (date.getDay() == nowDate.getDay()) {
      _time = '今天  ';

    } else if (date.getDay() == nowDate.getDay() - 1) {
      _time = '昨天  ';
    } else {
      return time;
    }
    _time += date.getHours() + ":";

    if (date.getMinutes() < 10) {
      // 对不足个位数的分钟进行填充
      _time += "0";
    }

    _time += date.getMinutes();

    return _time;
  }

  return time;

}