// Component/verifyPhone/verifyPhone.js
Component({
  properties: {

  },
  data: {
    phone:"",
    state:"验证",
    timeDown:30
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入框获取电话号码
    getInputPhone:function(e){
      this.setData({
        phone:e.detail.value
      })
    },
    //点击验证
    submitVerify:function(e){
      if(JSON.stringify(this.data.state).length > 5){
        //冷却中不可点击
      } else{
      this.setData({
        state:this.data.timeDown+"s后重试",
        timeDown:30
      })
      this.timeDown(this)
      //将phone传给后端进行验证（request请求）



      //模板数据与前端的互通
      this.triggerEvent('ComponentTap',this.data)
      }
    },
    //倒计时函数
    timeDown:function(body){
      var a = setTimeout(res=>{
          var newTimeDown = body.data.timeDown - 1
          if(newTimeDown == 0){
            clearTimeout(a)
          } else{
            this.timeDown(body)
          }
          if(newTimeDown == 0){
            body.setData({
              state:"重试",
              timeDown:30
            })
          }else{
            body.setData({
              state:newTimeDown+"s后重试",
              timeDown:newTimeDown
            })
          }
      },1000,body)
    }
  }
})
