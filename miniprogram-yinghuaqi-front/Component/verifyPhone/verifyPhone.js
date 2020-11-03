const HttpUtils = require("../../utils/HttpUtils")

// Component/verifyPhone/verifyPhone.js
Component({
  properties: {
    phone: String
  },
  data: {
    verifyCode: "",
    state: "获取验证码",
    timeDown: 30
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入框获取电话号码
    getInputPhone: function (e) {
      this.setData({
        verifyCode: e.detail.value
      })
    },

    //点击验证
    submitVerify: function (e) {
      if (this.data.state === "获取验证码") {
        console.log('aaaaa');
        //将验证码传给后端进行验证（request请求）
        HttpUtils.yhjRequest(
          'apply/getVerifyCode', {
            'phone': this.data.phone
          },
          function (res) {
            wx.showToast({
              title: '已请求验证码，请注意在短信中查收!',
              icon: 'loading',
              duration: 2000
            })

            this.setData({
              state: this.data.timeDown + "s后重试",
              timeDown: 30
            })
            this.timeDown(this);
    
            //模板数据与前端的互通
            this.triggerEvent('ComponentTap', this.data)

          },
          'get'
        )
      } 
    },
    //倒计时函数
    timeDown: function (body) {
      var a = setTimeout(res => {
        var newTimeDown = body.data.timeDown - 1
        if (newTimeDown == 0) {
          clearTimeout(a)
        } else {
          this.timeDown(body)
        }
        if (newTimeDown == 0) {
          body.setData({
            state: "重试",
            timeDown: 30
          })
        } else {
          body.setData({
            state: newTimeDown + "s后重试",
            timeDown: newTimeDown
          })
        }
      }, 1000, body)
    }
  }
})