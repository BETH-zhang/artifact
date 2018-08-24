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

  function runBarrager(text){
    var item={'img':'../images/heisenberg.png','info':text};
    $('#ppt').barrager(item);
    return true;
  }
  
  var Component = {
    Message: function(name, message, startTime, order) {
      var className = Constant.classNames[utils.random(0, 7)];
      if (!order) {
        // runBarrager(`${name || '匿名'}:${message}`);
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
        if (order) {
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