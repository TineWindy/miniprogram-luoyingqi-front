const HttpUtils = require("../../utils/HttpUtils")

// Component/verifyPhone/verifyPhone.js
Component({
  properties: {
    phone: String,
    verifyCodeState:Boolean
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
    //输入框获取验证码
    getInputVerifyCode: function (e) {
      this.setData({
        verifyCode: e.detail.value
      })
      //模板数据与前端的互通
      this.triggerEvent('ComponentTap', this.data.verifyCode)
    },

    //点击验证
    submitVerify: function (e) {
      if (this.data.state === "获取验证码") {
        var body = this;
        //将验证码传给后端进行验证（request请求）
        HttpUtils.yhjRequest(
          '/apply/getVerifyCode', {
            'phone': this.data.phone
          },
          function (res) {
            wx.showToast({
              title: '已请求验证码',
              icon: 'loading',
              duration: 2000
            })

            body.setData({
              state: body.data.timeDown + "s后重试",
              timeDown: 30
            })
            body.timeDown(body);

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
            state: "获取验证码",
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