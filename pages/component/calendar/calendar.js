
Component({
  properties: {
    year: {
      type: Number,
      value: 0,
    },
    month: {
      type: Number,
      value: 0,
    },
    checkindate:{
      type: String,
      value: '',
    },
    checkoutdate: {
      type: String,
      value: '',
    }
  },
  data: {
    // 这里是一些组件内部数据
    daylist: []
  },
  ready: function(){
      var year = this.data.year;
      var month = this.data.month;
      if(year==0||month==0){
        var date = new Date();
        year = date.getFullYear();
        month = date.getMonth() + 1;
      }  
      this.loadDate(year, month);
  },
  methods: {
    // 日期点击事件
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
          if (i == 0 && j < fdayweek) {
            item.day = prevdays - (fdayweek - 1 - j);
            item.style = "nonrange";
          }
          else if (i * 7 + j < monthdays + fdayweek) {
            var day = (i * 7 + j - fdayweek + 1) > 9 ? (i * 7 + j - fdayweek + 1) : "0" + (i * 7 + j - fdayweek + 1);
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
    },
    cancel:function(){
      var eventdetail = {name:'cancel'};
      this.triggerEvent('calendarevent', eventdetail, {})
    },
    confirm:function(){
      var daylist = this.data.daylist;
      var eventdetail = { name: 'confirm', year:this.data.year,month:this.data.month,checkindate: this.data.checkindate, checkoutdate: this.data.checkoutdate};
      this.triggerEvent('calendarevent', eventdetail, {})
    }
  }
})