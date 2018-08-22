var $mess = $('#mess');
var $mcInput = $('#mcInput');
var $mcName = $('#mcName');
var $main = $('#main');
var $mainBtn = $('#mainBtn');
var $weekMc = $('#weekMc');
var $peoQrcode = $('#peoQrcode');
var currentStep = 0;
bbMusic.init();

var playbackLog = [];

var Component = {
  Avatar: function(item, index) {
    var className = Constant.classNames[index % 7];
    return `<div class="avatar-container avatar-${item}">
      <div class="avatar border ${className}">${item}</div>
      ${item}
      <div class="opt">
        <div data-name="${item}" class="call">呼叫</div>
        <div data-name="${item}" class="delete">退出</div>
      </div>
    </div>`;
  },
  Message: function(type, name, message, startTime, text) {
    var className = Constant.classNames[type === 7 ? 7 : type % 7];
    return `<div class="message-item message-${startTime}">
      <div class="avatar border ${className}">${name}</div>
      <div class="msg">${message}${!!text ? `<span class="active">${text}</span>` : ''}</div>
    </div>`;
  },
  LiveIndex: function(name, index, role, title) {
    var className = Constant.classNames[1];
    var value = '新人';
    if (role === 'option1') {
      className = Constant.classNames[5];
      value = '工作汇报';
    } else if (role === 'option2') {
      className = Constant.classNames[6];
      value = '分享';
    } else if (role === 'option3') {
      className = Constant.classNames[8];
      value = '事业部';
    }
    return `<div class="live-list" title="${title}">
      <div class="live-index list-index${Number(index) + 1}"><div class="live-rotate"></div></div>
      <div class="live-avatar">
        <div class="avatar border ${className}">${value}</div>
        <p>${name}</p>
      </div>
    </div>`;
  }
}

function updatePPT(index) {
  var currentIndex = index || 0;
  // 初始化
  $('.btn-live').removeClass('btn-active');
  $('.ppt img').hide();

  // 处理当前
  $(`.btn-live${currentIndex}`).addClass('btn-active');
  $(`.ppt${currentIndex}`).show();
}

function initLocalData() {
  var list = localStorage.getItem('peos') &&
             localStorage.getItem('peos') !== 'undefined' &&
             JSON.parse(localStorage.getItem('peos'));
  if (list && list.length) {
    var lastName = list[list.length - 1];
    var listEle = list.map(function(item, index) {
      return Component.Avatar(item, index)
    });
    $('#joinParticipant').html(listEle.join(''))
    $('#joinParticipant').animate({scrollTop:$(`.avatar-${lastName}`).offset().top},1000);
    $('.currentNum').html(`当前人数:${list.length}人`)
  }
  updatePPT();

  var lives = localStorage.getItem('lives') &&
              localStorage.getItem('lives') !== 'undefined' &&
              JSON.parse(localStorage.getItem('lives'));
  mainFuncs.joinLiveList(lives);
}

var queryString = utils.queryString();
if (queryString.name) {
  $main.show();
} else if (queryString.mc) {
  $('.mc-qrcode').hide();
  $('#mcQrcode').modal({
    backdrop: false
  })
} else {
  var realPath = document.location.href + '?mc=true';
  $('#qrcode').qrcode({
    text: realPath,  //设置二维码内容
    render: "canvas",//设置渲染方式
    background: "#ffc107",//背景颜色
  });
  $('.mc-name').hide();
  $('#mcQrcode').modal({
    backdrop: false
  })
}

var openText = ['name', 'MC Connect', 'MC Start'];
var openRole = [2, 1, 0];
var openType = null;
if (queryString.name) {
  // mc链接成功
  openType = queryString.name;
} else if (queryString.mc) {
  // mc链接中
  openType = 1;
} else {
  // mc界面
  openType = 2;
}

function  runBarrager(text){
  var item={'img':'../images/heisenberg.png','info':text};
  $('body').barrager(item);
  return false;
}

var logger = function(type, name, val, text, startTime) {
  var startTime = startTime || (new Date()).getTime();
  if (utils.isNumber(openType)) {
    runBarrager(openText[openType] + val);
    $('#mess').append(Component.Message(type !== 'MC' ? type : 7, name, openText[openType] + val, startTime, text));
  } else {
    runBarrager(val);
    var html = Component.Message(type !== 'MC' ? type : 7, name, val, startTime, text);
    $('#mess').append(html);
  }
  $('#mess').animate({scrollTop: $('.message-' + startTime).offset() ? $('.message-' + startTime).offset().top : 0}, 1000);
}

var init = function(ws) {
  $mcInput.click(function() {
    if ($mcName.val()) {
      ws.send(JSON.stringify({
        roleType: 1,
        data: {
          mc: true,
          name: $mcName.val(), 
        }
      }));
    } else {
      $('.alert').html('MC的名字必须填写').alert()
    }
  });
}

var mainFuncs = {
  joinParticipant: function(data) {
    if (!$('.' + data.currentPeo).length) {
      if (!$('.avatar-' + data.currentPeo).length) {
        $('#joinParticipant').append(Component.Avatar(data.currentPeo, data.peos.length))
        console.log($('.avatar-' + data.currentPeo).offset().top, '--top')
        $('#joinParticipant').animate({scrollTop:$('.avatar-' + data.currentPeo).offset().top}, 1000);
      }
      $('.currentNum').html(`当前人数:${data.peos.length}人`)
    }
  },
  joinLiveList: function(lives) {
    if (lives) {
      var livesAry = Object.keys(lives);
      var lastName = livesAry[livesAry.length - 1]
      var livesList = livesAry.map(function(item, index) {
        if ('option' + currentStep !== lives[item].role) {
          return null;
        }
        return Component.LiveIndex(item, currentStep, lives[item].role, lives[item].title);
      })
      $('.share-list').html(livesList.join('')).css({ width: livesAry.length * (120 + 24) + 'px' })
    }
  }
}

var mainInit = function(ws) {
  $weekMc.html(queryString.name);
  setInterval(function() {
    $('.time').html(new Date());
    bbMusic.updateProgress();
  }, 1000);
  $mainBtn.click(function() {
    ws.send(JSON.stringify({
      roleType: 2,
      data: {
        mc: true,
        name: $mcName.val(),
        message: '你好吗？'
      },
    }));
  });
  var realPath1 = document.location.origin + '/participant.html';
  console.log(realPath1)
  $peoQrcode.qrcode({
    text: realPath1,  //设置二维码内容
    width: 160,
    height: 160,
    render: "canvas",//设置渲染方式
    background: "#3b3c40",//背景颜色
  });

  initWs(ws);

  $('.btn-live').click(function() {
    var index = $(this).attr('data-step');
    currentStep = index;
    
    updatePPT(index);
    var lives = localStorage.getItem('lives') && JSON.parse(localStorage.getItem('lives'));
    mainFuncs.joinLiveList(lives);
    ws.send(JSON.stringify({
      roleType: 2,
      data: {
        type: 'ppt',
        name: queryString.name,
        page: currentStep,
        message: `进入第${Number(currentStep) + 1}个环节： ${$(`.btn-live${currentStep}`).text()}`, 
      },
    }));
  })
}

function bindDelete() {
  var name = $(this).attr('data-name');
  ws.send(JSON.stringify({
    roleType: 2,
    data: {
      type: 'delete',
      mc: true,
      name,
      message: '删除' + name
    }
  }));
  $(`.avatar-${name}`).remove();
  var list = localStorage.getItem('peos') && JSON.parse(localStorage.getItem('peos'));
  if (list.length) {
    $('.currentNum').html(`当前人数:${list.length - 1}人`)
  }
}

function bindCall() {
  var name = $(this).attr('data-name');
  ws.send(JSON.stringify({
    roleType: 2,
    data: {
      type: 'call',
      mc: true,
      name,
      message: '呼叫' + name
    },
  }));
}

var currentRoleText = function(role) {
  var text = {
    'option0': '我是新人',
    'option1': '工作汇报',
    'option2': '我要分享',
    'option3': '老板分享',
  };
  return text[role] || '我是游客'
};

var initWs = function(ws) {
  $('.call').unbind('click', bindCall);
  $('.delete').unbind('click', bindDelete);
  $('.call').bind('click', bindCall);
  $('.delete').bind('click', bindDelete);
}

var ws = null;
if(window.WebSocket){
  initLocalData();

  ws = new WebSocket('ws://172.16.15.185:8001');
  // var ws = new WebSocket('ws://192.168.1.106:8001');
  // var ws = new WebSocket('ws://10.0.0.11:8001');
  ws.onopen = function(e){
    console.log("连接服务器成功");
    var role = null;
    if (utils.isNumber(openType)) {
      role = openRole[openType];
    } else {
      role = 2;
    }
    ws.send(JSON.stringify({
      roleType: role,
      data: {
        mc: queryString.mc,
        name: queryString.name
      },
    }));

    if (queryString.name) {
      mainInit(ws);
    } else if (!queryString.name && queryString.mc) {
      init(ws);
    }
  }
  
  ws.onclose = function(e){
    logger('MC', "MC", "~~服务器关闭");
  }
  ws.onerror = function(){
    logger('MC', "MC", "~~连接出错");
  }

  ws.onmessage = function(e){
    var res = JSON.parse(e.data) || {};
    console.log(res, '--------- MC接收消息 --------')
    if (res.roleType === 1 && res.data.name) {
      window.location.href = document.location.origin + document.location.pathname
        + '?name=' + res.data.name;
    } else if (res.roleType === 3 && res.data.peos) {
      mainFuncs.joinParticipant(res.data);
      mainFuncs.joinLiveList(res.data.lives);
      localStorage.setItem('peos', JSON.stringify(res.data.peos))
      localStorage.setItem('lives', JSON.stringify(res.data.lives))
      var index = res.data.peos.indexOf(res.data.currentPeo);
      var currentData = res.data.lives[res.data.currentPeo];

      playbackLog.push({
        eventType: 'joinLive',
        startTime: (new Date()).getTime(),
        data: res.data,
      })

      logger(index, res.data.currentPeo, res.data.currentPeo + '加入~~~', currentData.role && `${currentRoleText(currentData.role)} ${currentData.title}`);
    } else if (res.roleType === 3 && res.data.type === 'call') {
      var peos = localStorage.getItem('peos');
      var index = peos.indexOf(res.data.name);
      logger(index, res.data.name, '回复：' + res.data.message); 
    } else if (res.roleType === 2 && res.data.message) {
      mainFuncs.joinLiveList(res.data.lives);
      logger('MC', queryString.name, (res.data && res.data.message));
      localStorage.setItem('peos', JSON.stringify(res.data.peos))
      localStorage.setItem('lives', JSON.stringify(res.data.lives));
    } else {
      logger('MC', res.data.name, "~~连接成功");
    }
    initWs(ws)
  }
}

function initTimeLine() {
  var timeline = TimeLine(); 
  console.log(playbackLog)
  var timeStart = (new Date()).getTime();
  var data = playbackLog.concat([{
      eventType: 'ppt',
      startTime: timeStart + 1000,
      data: {
        page: 1,
      }
    }, {
      eventType: 'ppt',
      startTime: timeStart + 3000,
      data: {
        page: 2,
      }
    }, {
      eventType: 'ppt',
      startTime: timeStart + 5000,
      data: {
        page: 3,
      }
    }, {
      eventType: 'message',
      startTime: timeStart + 3000,
      data: {
        type: 'MC',
        name: "MC",
        value: "3",
      },
    }, {
      eventType: 'message',
      startTime: timeStart + 2000,
      data: {
        type: 'MC',
        name: "MC111",
        value: "2",
      },
    }, {
      eventType: 'audio',
      startTime: timeStart + 5000,
      data: {
        progress: 10,
      }
    }, {
      eventType: 'audio',
      startTime: timeStart + 12000,
      data: {
        pause: true,
      }
    }]);

  console.log(data, '???')

  timeline.init({
    data: data,
  }, {
    joinLive: function(res) {
      console.log('%c *** ppt ***:' + JSON.stringify(res), 'color: #c00;', res.data.page) 
      mainFuncs.joinParticipant(res.data); 
    },
    ppt: function(res) {
      console.log('%c *** ppt ***:' + JSON.stringify(res), 'color: #cc0;', res.data.page)
      updatePPT(res.data.page);
    },
    message: function(res) {
      console.log('%c *** text ***:' + JSON.stringify(res), 'color: #2196F3')
      logger(res.data.type, res.data.name, res.data.value, '', res.startTime);
    },
    audio: function(val) { console.log('%c *** audio ***:' + val, 'color: #009688') },
  }, function() {
    console.log('初始化页面状态');
    $('#mess').html('');
    $('#joinParticipant').html('');
    updatePPT(0);
  });

  return timeline;
}

$('#playback').click(function() {
  initTimeLine();
});

// 初始化ppt内容
var LivePPT = new LivePPT(
  document.getElementById('ppt-h5'),
  'http://172.16.15.185:8081/newppt/newppt.html?isLoadPageController=true',
  'teacher',
);

function noticePPT(res) {
  // 通知拓课云课件
  console.log('????', window.frames);
  var iframe = window.frames[0];
  // 传递消息
  iframe.postMessage(JSON.stringify(res), 'http://172.16.15.185:8081');
}

function sendPPTEvent(slide) {
  if (slide < 0) {
    console.log('非法传入');
    return null;
  }
  var tpEle = LivePPT.getIframeEle('ppt-h5', 'customController_totalSlideSpan');
  var totalPage = LivePPT.matchNumber(tpEle.innerText)[0];
  console.log(totalPage);
  if (slide > totalPage - 1) {
    console.log('非法传入');
    return null;
  }

  var data = Object.assign({}, {
    type: 'ppt',
    name: queryString.name,
  }, {
    source: "tk_dynamicPPT",
    data: {
      action: 'slideChangeEvent',
      externalData: {initiative: true},
      slide: slide,
      step: 0,
      stepTotal: 1,
    },
  });

  noticePPT(data);
  ws.send(JSON.stringify({
    roleType: 2,
    data: data,
  }));
}

LivePPT.addEvent(function(e) {
  // 鼠标在iframe之外的区域打开才OK
  switch(e.type) {
    case 'keydown':
      console.log('监听到键盘事件', e);
      var ele = LivePPT.getIframeEle('ppt-h5', 'customController_skipSlide');
      if (e.keyCode === 39) {
        sendPPTEvent(Number(ele.value));
      } else if (e.keyCode === 37) {
        sendPPTEvent(Number(ele.value) - 2);
      }
      break;
    default:
      break;
  }
});

LivePPT.receiveEvent('http://172.16.15.185:8081', function(res) {
  console.log(res, typeof res);
  ws.send(JSON.stringify({
    roleType: 2,
    data: Object.assign({}, {
      type: 'ppt',
      name: queryString.name,
    }, res),
  }));
});
