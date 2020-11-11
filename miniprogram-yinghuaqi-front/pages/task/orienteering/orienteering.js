

Page({
  data: {
    personalTask:[{
      taskId:0,
      taskStatus:'FINISHED',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    },{
      taskId:0,
      taskStatus:'FINISHED',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    }],
    otherTask:[{
      taskId:0,
      taskStatus:'FINISHED',
      taskLocal:"武汉大学奥场",
      taskPeople:"邓六水",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    },{
      taskId:0,
      taskStatus:'STARTED',
      taskLocal:"武汉大学奥场",
      taskPeople:"邓六水",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    }],
    teamTask:[{
      taskId:0,
      taskStatus:'CANCELED',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    },{
      taskId:0,
      taskStatus:'CANCELED',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    }],
    status:"NOT_RUNNING",
    tabIndex:0,
    tabBarIndex:0,
    modalShow:false
  },
  onLoad: function (options) {

  },
  //切换单人任务的目标任务
  changeTab:function(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
  },
  //切换任务
  changeTabCur:function(e){
    changeTabCurIndex(this,e);
  },
  //隐藏模态框
  hideModal(e) {
    this.setData({
      modalShow: false
    })
  },
  //显示模态框
  showModal(e){
    this.setData({
      modalShow: true
    })
  },
  //开始越野
  taskBegin(e){
    taskBeginFun(this)
  }
})

//切换任务tabCur
function changeTabCurIndex(body,e){
  if(body.data.tabBarIndex == e.currentTarget.dataset.index +1){
    body.setData({
      tabBarIndex:0
    })
  }else{
    if(e.currentTarget.dataset.index < 2 && body.data.tabIndex == 0 && body.data.personalTask[e.currentTarget.dataset.index].taskStatus == 'CANCELED'){
      wx.showToast({
        title: '暂未开始此任务~',
        icon:"none"
      })
      return 
    }
    if(e.currentTarget.dataset.index < 2 && body.data.tabIndex ==  1 && body.data.otherTask[e.currentTarget.dataset.index].taskStatus == 'CANCELED'){
      wx.showToast({
        title: '暂未开始此任务~',
        icon:"none"
      })
      return 
    }
    if(e.currentTarget.dataset.index > 1 && body.data.teamTask[e.currentTarget.dataset.index -2 ].taskStatus == 'CANCELED'){
      wx.showToast({
        title: '暂未开始此任务~',
        icon:"none"
      })
      return 
    }
    body.setData({
      tabBarIndex:e.currentTarget.dataset.index+1
    })
  }
}
//活动开始函数
function taskBeginFun(body){
  
}