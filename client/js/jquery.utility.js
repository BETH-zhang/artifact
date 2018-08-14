jQuery.utility = {
  scale: function (id, num) {//拼接html形成刻度尺
      var width = $(id).width();
      var hour = width / num; //大格的刻度
      var min = hour / 10; //小格的刻度
      if (num > 1) {
          for (var i = 0; i < (num + 1); i++) {
              $(id).append('<div class="horizontal-line month-line even-month" style="left:' + i * hour + 'px"><div class="month">' + i + '</div></div>');
              if (i != (num)) {
                  for (var j = 1; j < 10; j++) {
                      var left = Number(i * hour) + Number(j * min);
                      if (j == 5) {
                          $(id).append('<div class="horizontal-line month-line slow-month" style="left:' + left + 'px"></div>');
                      } else {
                          $(id).append('<div class="horizontal-line month-line odd-month" style="left:' + left + 'px"></div>');
                      }
                  }
              }
          }
      }
  },
  hidden: function (num, id) {//生成hidden控件
      for (var j = 0; j < num; j++) {
          var input = document.createElement("input"); //创建input
          input.setAttribute("type", "hidden"); //设置type属性
          input.setAttribute("id", id + j); //id
          document.body.appendChild(input); //插入到body内
      }
  },
  gettime: function (ck) {//根据鼠标点击位置生成时间
      var e = window.event || even;
      var width = $(ck).width() / (24 * 60 * 60); //计算出刻度/秒
      var show = e.offsetX / width; //计算总秒数
      var ss = parseInt(show); // 秒
      var min = 0; // 分
      var hour = 0; // 小时
      //根据秒数计算时钟和分钟
      if (ss > 60) {
          min = parseInt(ss / 60);
          ss = parseInt(ss % 60);
          if (min > 60) {
              hour = parseInt(min / 60);
              min = parseInt(min % 60);
          }
      }
      var result = "" + parseInt(ss) + "";
      if (ss < 10)//生成标准时间格式的秒钟
          result = "0" + parseInt(ss) + "";
      if (min > 0) {//生成标准时间格式的分钟
          if (min < 10)
              result = "0" + parseInt(min) + ":" + result;
          else
              result = "" + parseInt(min) + ":" + result;
      } else {
          result = "00:" + result;
      }
      if (hour > 0) {//生成标准时间格式的时钟
          if (hour < 10)
              result = "0" + parseInt(hour) + ":" + result;
          else
              result = "" + parseInt(hour) + ":" + result;
      } else {
          result = "00:" + result;
      }
      return result;
  }

}
//var is = 1;
$.fn.timeline = function () {
  this.table = function (tab) {//生成时间轴结构
      var trnum = Number(tab) + 1;
      for (var i = 0; i < trnum; i++) {
          if (i == 0) {
              this.append('<tr style="height: 30px; background-color: #F4F4F4"><td style="width: 80px"><p style="color:#000" id="time"></p></td>'
              + '<td><div id="scale" class="gt-timeline" style="width: 100%"><div class="main_line" style="width: 100%"></div></div></td></tr>');
          } else {
              this.append('<tr><td><p id="p' + (i - 1) + '" >窗口' + i + '</p></td><td id="ck' + (i - 1) + '"></td></tr>');
          }
      }

      $.utility.hidden(4, "end");
      $.utility.hidden(4, "left");
  }
  this.scale = function (num) {//生成指定数量刻度尺
      var width = $("#scale").width();
      var hour = width / num; //大格的刻度
      var min = hour / 10; //小格的刻度
      if (num > 1) {
          for (var i = 0; i < (num + 1); i++) {
              $("#scale").append('<div class="horizontal-line month-line even-month" style="left:' + i * hour + 'px"><div class="month">' + i + '</div></div>');
              if (i != (num)) {
                  for (var j = 1; j < 10; j++) {
                      var left = Number(i * hour) + Number(j * min);
                      if (j == 5) {
                          $("#scale").append('<div class="horizontal-line month-line slow-month" style="left:' + left + 'px"></div>');
                      } else {
                          $("#scale").append('<div class="horizontal-line month-line odd-month" style="left:' + left + 'px"></div>');
                      }
                  }
              }
          }
      }
  }
  this.video = function (ChnlName, windowsid, lpStartTime, is, EndTime) {//查询录像，按时间段显示
      var d1 = lpStartTime.replace(/\-/g, "/");
      var date1 = new Date(d1);
      var d2 = EndTime.replace(/\-/g, "/");
      var date2 = new Date(d2);
      var fen = parseInt(date2 - date1) / 1000 / 60;
      //var ChnlName = $("#spid").val();
      var width = $("#ck" + windowsid).width() / (24 * 60);
      var hour = lpStartTime.split(' ');
      var time = hour[1].split(':');
      var left = (Number(time[0] * 60) + Number(time[1])) * width;
      var lx, ox, left;
      var statu = false;
      if (is == 2) {
          $("#ck" + windowsid).append("<div id='fide" + windowsid + "' style='width:" + $("#ck" + windowsid).width() + "px' class='fide' ondblclick=\"mouseup(this," + windowsid + ",'" + ChnlName + "')\">" +
          "<div id='jindu" + windowsid + "' class='schedule'></div></div>");
          $("#jindu" + windowsid).mousedown(function (e) {
              lx = $("#jindu" + windowsid).css("margin-left").replace("px", "");
              ox = e.clientX - lx;
              statu = true;
          });
          $(document).mouseup(function () {
              statu = false;
          });
          $("#fide" + windowsid).mousemove(function (e) {
              if (statu) {
                  var kedu = $("#ck" + windowsid).width() / (24 * 60 * 60); //刻度
                  var last = $("#ck" + windowsid).children("div:last-child").css("margin-left").replace("px", "");
                  var first = $("#ck" + windowsid).children("div").eq(1).css("margin-left").replace("px", "");
                  var la = Number(last) + Number(180 * kedu);
                  //                    if (reltime == edtime || marleft > la)
                  //                        marleft = la;
                  left = e.clientX - ox;
                  if (left < first) {
                      left = first;
                  }
                  if (left > (Number(last) + 2)) {
                      left = Number(last) + 2;
                  }
                  $("#jindu" + windowsid).css('margin-left', left);
                  mouseup($("#fide" + windowsid), windowsid, ChnlName);
              }
          });
      }
      $("#ck" + windowsid).append("<div title='" + EndTime + "'  class='vidio' style='width:" + width * fen + "px; margin-left:" + Number(left) + "px; z-index:" + is + "'></div>");
  }
  this.showSpi = function (windowsid, dvid, endtime) {//点击初始化
      $('#ck' + windowsid).html("");
      $('#p' + windowsid).text(dvid);
      $("#end" + windowsid).val(endtime);
  }
  this.schedule = function (bgtime, edtime, reltime, windowsid) {//移动录像播放进度
      var kedu = $("#ck" + windowsid).width() / (24 * 60 * 60); //刻度
      var timecha = Number(reltime) - Number(bgtime); //时间差 播放值-开始值
      var width = timecha * kedu;
      var mar = $("#left" + windowsid).val().replace("px", ""); //保存在隐藏控件的初始偏差值
      var marleft = Number(mar) + Number(width) - 1; //偏差值=移动距离+初始偏差值
      if ($("#ck" + windowsid).children().length > 0) {
          var last = $("#ck" + windowsid).children("div:last-child").css("margin-left").replace("px", "");
          var la = Number(last) + Number(180 * kedu);
          if (reltime == edtime || marleft > la)
              marleft = la;
      }
      $("#jindu" + windowsid).css("margin-left", marleft + "px"); //移动偏移
  }
  return this;
}

function mouseup(ck, num, spid) {//点击时间点进行录像回放
  var e = window.event || even;
  var result = $.utility.gettime(ck);//点击的时间
  var endtime = $("#end" + num).val(); //查询时的结束时间
  var clicktime = result.replace(":", "").replace(":", "");
  var set = $("#ck" + num).children("div:last-child").attr("title"); //最后一个录像文件的结束时间
  var stat = $("#ck" + num).children("div").eq(1).attr("title").split(" ")[1].replace(":", "").replace(":", "");
  //alert(stat-300);
  var end = set.split(" ")[1].replace(":", "").replace(":", "");
  if (Number(clicktime) <= Number(end) && Number(clicktime) >= Number(stat - 300)) {
      $("#jindu" + num).css("display", "block");
      $("#jindu" + num).css("margin-left", e.offsetX + "px");
      $("#left" + num).val(e.offsetX + "px");
      var year = endtime.split(" ")[0];
      var lpStartTime = year + " " + result;
      clientd2.OCX_OpenRecord_ByTime(spid, lpStartTime, set, num); //set也可以是endtime
  } else { alert("此时间点没有查询到录像！"); }
}