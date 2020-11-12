//引入 WxParse
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    sourceUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = JSON.parse(decodeURIComponent(options.url));
    var id = options.id;

    this.setData({
      sourceUrl: url,
      id: id
    })
  },

  onShow: function () {
    if (this.data.id != -1) {
      countAccess(this.data.id);
    }
  },

  onShareAppMessage: function (options) {
  },

})

function countAccess(id) {
  httpFuncs.yhjRequest(
    '/article/countAccess',
    {
      id: id
    },
    function (res) {
      console.log('访问次数加1')
    },
    'get'
  )
}