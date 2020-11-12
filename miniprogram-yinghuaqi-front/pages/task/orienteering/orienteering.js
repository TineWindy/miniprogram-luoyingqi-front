const HttpUtils = require('../../../utils/HttpUtils')

Page({
  data: {
    A: [],
    B: [],
    teamTask: [],
    status: "NOT_RUNNING",
    tabIndex: 0,
    tabBarIndex: 0,
    modalShow: false,
    coupleNumber: '',
    totalScore: '',
    textStatus: '未开始',
    startTime: ''
  },
  onLoad: function (options) {
    getOrienteeringInfo(this,false);
  },

  onPullDownRefresh (options){
    // 加载动画
    wx.showNavigationBarLoading();

    getOrienteeringInfo(this,true);
  },

  //切换单人任务的目标任务
  changeTab: function (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  //切换任务
  changeTabCur: function (e) {
    changeTabCurIndex(this, e);
  },
  //隐藏模态框
  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },
  //显示模态框
  showModal(e) {
    this.setData({
      modalShow: true
    })
  },
  //开始越野
  taskBegin(e) {
    var this_ = this;
    wx.showModal({
      title: '提示',
      content: '您是否确定要开始定向越野?',
      success(res) {
        if (res.confirm) {
          taskBeginFun(this_);
        }
      }
    })
  },
  chengyuSubmit(e) {
    submitCY(this);
  }
})

//切换任务tabCur
function changeTabCurIndex(body, e) {
  if (body.data.tabBarIndex == e.currentTarget.dataset.index + 1) {
    body.setData({
      tabBarIndex: 0
    })
  } else {
    if (e.currentTarget.dataset.index < 2 && body.data.tabIndex == 0 && body.data.A[e.currentTarget.dataset.index].taskStatus == 'CANCELED') {
      wx.showToast({
        title: '暂未开始此任务~',
        icon: "none"
      })
      return
    }
    if (e.currentTarget.dataset.index < 2 && body.data.tabIndex == 1 && body.data.B[e.currentTarget.dataset.index].taskStatus == 'CANCELED') {
      wx.showToast({
        title: '暂未开始此任务~',
        icon: "none"
      })
      return
    }
    if (e.currentTarget.dataset.index > 1 && body.data.teamTask[e.currentTarget.dataset.index - 2].taskStatus == 'CANCELED') {
      wx.showToast({
        title: '暂未开始此任务~',
        icon: "none"
      })
      return
    }
    body.setData({
      tabBarIndex: e.currentTarget.dataset.index + 1
    })
  }
}
//活动开始函数
function taskBeginFun(body) {
  HttpUtils.yhjRequest(
    '/task/startOri',
    '',
    function(res){
      getOrienteeringInfo(body,false);
    }
  )
}

function getOrienteeringInfo(body,isRefresh) {
  HttpUtils.yhjRequest(
    '/task/getOriInfo',
    '',
    function (res) {
      var textStatus_ = statusCode2Text(res.resultObj.status);

      body.setData({
        status: res.resultObj.status,
        startTime: res.resultObj.startTime,
        coupleNumber: res.resultObj.coupleNumber,
        totalScore: res.resultObj.score,
        A: res.resultObj.SINGLE_A,
        B: res.resultObj.SINGLE_B,
        teamTask: res.resultObj.team,
        textStatus: textStatus_
      })

      if (isRefresh){
        wx.showToast({
          title: '刷新成功！',
          duration:2000
        });

        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }

    }
  )
}

function submitCY(body){
  HttpUtils.yhjRequest(
    '/task/startTeam',
    '',
    function(res){
      getOrienteeringInfo(body,false);
    }
  )
}

function statusCode2Text(code) {
  if (code === "SINGLE_RUNNING" || code ==="SINGLE_FINISHED" || code ==="TEAM_RUNNING") {
    return "进行中";
  } else if (code === "TEAM_FINISHED") {
    return "已完成";
  } else {
    return "未开始";
  }
}