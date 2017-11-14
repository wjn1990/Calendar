// pages/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 2017,
    month: 11,
    daylist: [],
    checkindate: "",
    checkoutdate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    this.loadDate(year, month);
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
  day_click: function (e) {
    var checkin = this.data.checkindate;
    var checkout = this.data.checkoutdate;
    var id = e.currentTarget.id;
    if ((checkin == "" && checkout == "") || (checkin != "" && checkout != "")) {
      this.setData({
        checkindate: id,
        checkoutdate: ""
      })
    }
    else if (checkin != "") {
      if (checkin < id) {
        this.setData({
          checkoutdate: id
        });
      }
      else {
        this.setData({
          checkindate: id
        });
      }
    }
    else if (checkout != "") {
      this.setData({
        checkindate: id
      })
    }
  },
  showPrevMonth: function () {
    var year = this.data.year;
    var month = this.data.month;
    month = month - 1;
    this.loadDate(year, month);
  },
  showNextMonth: function () {
    var year = this.data.year;
    var month = this.data.month;
    month = month + 1;
    this.loadDate(year, month);
  },
  loadDate: function (y, m) {
    var datearr = [];
    var monthd = new Date(y, m, 0);
    var year = monthd.getFullYear();
    var month = monthd.getMonth() + 1;
    var monthdays = monthd.getDate();//每个月的天数
    var firstdate = new Date(year, month - 1, 1);//某月的第一天
    var fdayweek = firstdate.getDay();//0-6,代表周日到周六
    var rows = Math.ceil((monthdays - (7 - fdayweek)) / 7) + 1//行数
    var prevmonthd = new Date(year, month - 1, 0);
    var prevdays = prevmonthd.getDate();
    for (var i = 0; i < rows; i++) {
      var rowdata = [];
      for (var j = 0; j < 7; j++) {
        var item = {};
        //item.id = year + "-" + month + "_" + (i * 7 + j);
        if (i == 0 && j < fdayweek) {
          item.day = prevdays - (fdayweek - 1 - j);
          item.style = "nonrange";
        }
        else if (i * 7 + j < monthdays + fdayweek) {
          var day = (i * 7 + j - fdayweek+1) > 9 ? (i * 7 + j - fdayweek+1) : "0" + (i * 7 + j - fdayweek+1);
          item.id = year + "-" + month + "-" + day;
          item.day = i * 7 + j - fdayweek + 1;
          item.style = "";
        }
        else {
          item.day = rows * 7 - fdayweek - monthdays + j - 6;//剩余天数+当前下标-6
          item.style = "nonrange";
        }
        rowdata.push(item);
      }
      datearr.push(rowdata);
    }
    this.setData({
      year: year,
      month: month,
      daylist: datearr
    })
  }
})