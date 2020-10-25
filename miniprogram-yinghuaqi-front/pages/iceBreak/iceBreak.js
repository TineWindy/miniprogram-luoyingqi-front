const HttpUtils = require('../../utils/HttpUtils')

Page({
  data: {
    isApplied:true,                   //是否报名
    basicPersonalInfo:{}               //个人信息
  },
  onLoad: function (options) {
    getUserBasicInfo(this)
  }
})

//获取个人(全部)基本信息
function getUserBasicInfo(body) {
  HttpUtils.yhjRequest(
    '/user/showUsrInfo',
    '',
    function (res) {
      body.setData({
        basicPersonalInfo:res.resultObj
      })
    },
    'get'
  )
}