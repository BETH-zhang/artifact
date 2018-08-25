/**
 * Message
 * 1.0.0
 * Copyright (c) 2018-08-23 19:39:26 Beth
 * IM消息处理
 * depend [jQuery.js, utils.js, jQuery.barrager.js]
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Message = factory())
})(this, function() {
  'use strict';

  var Version = '1.0.0';

  //是否首次执行
  var run_once = true;
  //弹幕索引
  var index = 0;
  //每条弹幕发送间隔
  var looper_time= 3*1000;
  var msgData = [];
  var looper = null

  function barrager() {
    //发布一个弹幕
    // $('body').barrager({
    //   info: msgData[0], //文字 
    //   href: '', //链接
    //   speed: 16,
    //   close: false, //显示关闭按钮 
    // });

    msgData.splice(0, 1)
    //所有弹幕发布完毕，清除计时器。
    if(!msgData.length){
      clearInterval(looper);
      looper = null;
      run_once = true;
    }
  } 

  function runBarrager(text){
    msgData.push(text);
    if (run_once) {
      looper = setInterval(barrager, looper_time);
      run_once = false;
    }
  }

  var Component = {
    Message: function(name, message, startTime, order) {
      var className = Constant.classNames[utils.random(0, 7)];
      if (!order) {
        runBarrager(`${name || '匿名'}:${message}`);
      }
      return `<div class="message-item message-${startTime}" style="min-height: 50px">
        <div class="avatar border ${className}">${name || '匿名'}</div>
        <div class="msg">${message}</div>
      </div>`;
    },
  }
  
  function Message(ele) {
    var parentEle = ele || document.body;
    var messageContainer = `
      <div id="message">
      </div>
    `;
    parentEle.innerHTML = messageContainer;

    return {
      initData: function(ary) {

      },
      push: function(name, msg, order) {
        console.log(name, msg, 'msg---');
        var startTime = startTime || (new Date()).getTime();
        var html = Component.Message(name, msg, startTime, order);
        if (true || order) {
          $('#message').prepend(html)
        } else {
          $('#message').append(html)
        }
        $('#message').animate({scrollTop: $('.message-' + startTime).offset() ? $('.message-' + startTime).offset().top : 0}, 1000);
      },
    }
  }
  
  var Message$1 = Message;
  
  return Message$1;
})