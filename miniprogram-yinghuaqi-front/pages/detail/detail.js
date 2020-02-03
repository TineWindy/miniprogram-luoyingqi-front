//引入 WxParse
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
const ApiHost = app.globalData.ApiHost;
var httpFuncs = require("../../utils/HttpUtils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    title: "",
    source: "",
    publishTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var that = this;

    httpFuncs.yhjRequest(
      "/timeline/getArticleInfo", {
        id: id
      },
      function(res) {
        that.setData({
          id: id,
          title: res.resultObj.title,
          source: res.resultObj.source,
          publishTime: res.resultObj.publishTime
        });
        /**
         * WxParse.wxParse(bindName , type, data, target,imagePadding)
         * 1.bindName绑定的数据名(必填)
         * 2.type可以为html或者md(必填)
         * 3.data为传入的具体数据(必填)
         * 4.target为Page对象,一般为this(必填)
         * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
         */
        var article = res.resultObj.content;

        WxParse.wxParse('article', 'html', article, that, 5);
      }, "get"
    );
  }

})