

Page({
  data: {
    personalTask:[{
      taskId:0,
      taskStatus:'done',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    },{
      taskId:0,
      taskStatus:'notDone',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    }],
    teamTask:[{
      taskId:0,
      taskStatus:'done',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    },{
      taskId:0,
      taskStatus:'notDone',
      taskLocal:"武汉大学牌坊",
      taskPeople:"王二威",
      taskTime:"9:12",
      taskReward:"一张卡片",
      taskScore:60
    }],
    tabBarIndex:0,
    modalShow:false
  },
  onLoad: function (options) {

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
    body.setData({
      tabBarIndex:e.currentTarget.dataset.index+1
    })
  }
}
//活动开始函数
function taskBeginFun(body){
  
}