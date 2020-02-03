// pages/timeline/timeline.js
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")
var dayTime = require("../../utils/util.js")

Page({
  //页面的初始数据
  data: {
    page: 0,
    tab: 0,
    list: [],
    list1: []
  },
  //生命周期函数--监听页面加载
  onLoad: function(options) {
    getTotalList(this);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      page: 0
    });
    getTotalList(this);
  },

  //触底加载
  onReachBottom: function() {
    getMoreList(this);
  },
  //进入详情页面
  toDetail: function(e) {
    myToDetail(this, e)
  },
  //改变tab页为“推荐”
  changeTabTo_0: function(e) {
    this.setData({
      tab: 0
    })
  },
  //改变tab页为“活动”
  changeTabTo_1: function() {
    this.setData({
      tab: 1
    })
  }
})
//获取数据列表
function getTotalList(body) {
  let nextPage = body.data.page + 1;
  httpFuncs.yhjRequest(
    '/timeline/getAllTimeline', {
      page: body.data.page
    },
    function(res) {
      let _list = res.resultObj.map(e => myPublishTime(e))
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
  if (oldList.length <= 120) {
    let nextPage = body.data.page + 1;
    httpFuncs.yhjRequest(
      '/timeline/getAllTimeline', {
        page: body.data.page
      },
      function(res) {
        let _list = res.resultObj.map(e => myPublishTime(e))
        body.setData({
          list: oldList.concat(_list),
          page: nextPage
        })
      },
      'GET'
    );
  } else {
    wx.showToast({
      title: '我是有底线滴',
      icon: 'none'
    })
  }
}
//进入详情页面
function myToDetail(body, e) {
  var id = e.currentTarget.id
  wx.navigateTo({
    url: '../detail/detail?id=' + id,
  })
}
//publishTime的处理
function myPublishTime(e) {
  let date = new Date(e.publishTime);
  console.log(e.publishTime);
  let nowDate = new Date();
  let _publishTime = dayTime.formatTime(date);
  let _nowDate = dayTime.formatTime(nowDate);
  if (_publishTime.substring(0, 10) == _nowDate.substring(0, 10)) {
    _publishTime = '今天  ' + _publishTime.substring(11, 16)
  } else if (_publishTime.substring(0, 7) == _nowDate.substring(0, 7) && Number(_nowDate.substring(8, 10)) - Number(_publishTime.substring(8, 10)) == 1) {
    _publishTime = '昨天  ' + _publishTime.substring(11, 16)
  } else {
    _publishTime = _publishTime.substring(0, 16)
  }
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