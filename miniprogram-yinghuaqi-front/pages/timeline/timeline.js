// pages/timeline/timeline.js
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")
var dayTime = require("../../utils/util.js")

Page({
  //页面的初始数据
  data: {
    itemChooce: ["推送", "推广"],
    TabCur: 0,
    scrollLeft: 0,
    currentType: 'push', // 默认推送页面
    promotionList: [],
    pushList: [],
    pushCurPage: 0,
    promotionCurPage: 0,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    // 清0再重新获取
    if (this.data.currentType == 'push') {
      this.setData({
        pushCurPage: 0,
        pushList: []
      })

    } else if (this.data.currentType == 'promotion') {
      this.setData({
        promotionCurPage: 0,
        promotionList: []
      })
    }

    getArticleByType(this,false);
  },
  //切换头部TAB
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      currentType: this.data.TabCur == 0 ? 'push' : 'promotion'
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 清0再重新获取
    if (this.data.currentType == 'push') {
      this.setData({
        pushCurPage: 0,
        pushList: []
      })

    } else if (this.data.currentType == 'promotion') {
      this.setData({
        promotionCurPage: 0,
        promotionList: []
      })
    }

    // 加载动画
    wx.showNavigationBarLoading();

    // 获取文章
    getArticleByType(this,true);
  },

  //触底加载
  onReachBottom: function () {
    getArticleByType(this);
  },

  //进入详情页面
  toDetail: function (e) {
    toDetailArticle(this, e)
  }
})

//获取数据列表
function getArticleByType(body,isRefresh) {
  let curPage, typeList;

  if (body.data.currentType == 'push') {
    curPage = parseInt(body.data.pushCurPage);
    typeList = body.data.pushList;

  } else if (body.data.currentType == 'promotion') {
    curPage = parseInt(body.data.pushCurPage);
    typeList = body.data.promotionList;

  } else {
    wx.showToast({
      title: '加载错误',
      icon: 'none',
      duration: 3000
    })
    return;
  }

  httpFuncs.yhjRequest(
    '/article/gerArticlesByType', {
    type: body.data.currentType,
    start: curPage * 10,
    end: (curPage + 1) * 10 - 1
  },
    function (res) {
      if (res.resultObj != null && res.resultObj.length != 0) {
        let _list = res.resultObj.map(e => ArticleProcess(e));
        typeList = typeList.concat(_list);

        if (body.data.currentType == 'push') {
          body.setData({
            pushCurPage: curPage + 1,
            pushList: typeList
          })

        } else if (body.data.currentType == 'promotion') {
          body.setData({
            promotionCurPage: curPage + 1,
            promotionList: typeList
          })
        }
      } else {
        wx.showToast({
          title: '我也是有底线的~',
          icon: 'none',
          duration: 2000
        })
      }

      if (isRefresh){
        wx.showToast({
          title: '刷新成功！',
          duration:2000
        });

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }

    },
    'GET'
  );
}

//进入详情页面
function toDetailArticle(body, e) {
  // url较长,需要特殊处理
  var url = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.url));
  var id = e.currentTarget.dataset.id;
  wx.navigateTo({
    url: '../detail/detail?url=' + url + '&id=' + id,
  })
}

// 处理文章时间
function ArticleProcess(e) {
  // 处理发布时间
  let _startShowTime = timeProcess(e.startShowTime);

  return {
    id: e.id,
    title: e.title,
    introduction: e.introduction,
    startShowTime: _startShowTime,
    coverPicture: e.coverPicture,
    sourceUrl: e.sourceUrl,
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

  // 年
  if (date.getFullYear() === nowDate.getFullYear()) {
    // 月
    if (date.getMonth() === nowDate.getMonth()) {
      // 只处理今天的状况
      if (date.getDate() === nowDate.getDate()) {
        console.log(date.getMonth())
        console.log(nowDate.getMonth())
        _time = '今天  ';
      } else {
        // 否则只显示 月份和日
        _time = (date.getMonth() + 1) + "/" + date.getDate() + " "
      }

      _time += date.getHours() + ":";

      if (date.getMinutes() < 10) {
        // 对不足个位数的分钟进行填充
        _time += "0";
      }

      _time += date.getMinutes();

      return _time
    }

    return time;
  }
}