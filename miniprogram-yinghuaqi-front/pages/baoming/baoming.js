// pages/baoming/baoming.js
Page({
  data: {
    questionListOne:[{
      id:'1',
      type:'select',
      stem:"您目前的在读学历是？(最少2项，最多4项)",
      remarks:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      options:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      value:[],
      valueTitle:"年级",
      total:0,
      min:2,
      max:4,
      mandatory:true,
      fit:true
    },{
      id:'5',
      type:'select',
      stem:"您目前的在读学历是？(最少2项，最多4项)",
      remarks:"我们承诺不会外泄您的姓名，仅供结果集去使用",
      options:[{text:"本科一年级",res:false},{text:"本科二年级",res:false},{text:"本科三年级",res:false},{text:"本科四年级",res:false},{text:"本科五年级",res:false},{text:"硕士",res:false},{text:"博士及以上",res:false}],
      value:[],
      valueTitle:"年级",
      total:0,
      min:2,
      max:4,
      mandatory:true,
      fit:true
    }],
    questionListTwo:[{
      id:'2',
      type:'input',
      stem:"姓名",
      remarks:"",
      options:[],
      value:"",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }],
    questionListThree:[{
      id:'3',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }],
    questionListFour:[{
      id:'8',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    },{
      id:'9',
      type:'picker',
      stem:"学院",
      remarks:"",
      options:["计算机学院","哲学学院", "文学院", "外国语言文学学院", "新闻与传播学院", "艺术学院", "历史学院", "经济与管理学院", "法学院"],
      value:"计算机学院",
      total:0,
      min:0,
      max:0,
      mandatory:true,
      fit:true
    }]
  },
  //模板js
  onComponentTap:function(e){
    console.log(e)
    var indexTemp = e.currentTarget.dataset.index
    var nameTemp = e.currentTarget.dataset.name
    this.setData({
      [`${nameTemp}[${indexTemp}]`]:e.detail
    })
  },
  //提交按钮
  submit:function(e){
    //判断是否有必选题未填写
    //提醒用户提交
    //信息整合，将后端需要的信息包装
    //发送post请求
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})