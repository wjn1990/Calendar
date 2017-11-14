// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarshow:false,
    year:2017,
    month:11,
    checkindate:'',
    checkoutdate:'',
    checkindatestr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var checkindatestr = year+'-'+month+'-'+day;
    this.setData({
      calendarshow: false,
      year:year,
      month:month,
      checkindate: checkindatestr,
      checkoutdate: checkindatestr,
      checkindatestr: checkindatestr
    })
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
  
  },
  choosedate:function(){
    this.setData({
      calendarshow:true
    })
  },
  calendarEvent:function(e){
    var eventdetail = e.detail;
    var actionname = eventdetail.name
    if(actionname=="confirm"){
      var year = eventdetail.year;
      var month = eventdetail.month;
      var checkindate = eventdetail.checkindate;
      var checkoutdate = eventdetail.checkoutdate;
      var checkindatestr='';
      if (checkoutdate!=''){
        checkindatestr = checkindate + '至' + checkoutdate;
      }
      else{
        checkindatestr = checkindate;
      }
      this.setData({
        calendarshow: false,
        year:year,
        month:month,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
        checkindatestr: checkindatestr
      })
    }
    else if(actionname=='cancel'){
      this.setData({
        calendarshow: false
      })
    }
  }
})