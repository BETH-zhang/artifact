// 回放相关

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
    updatePPT(-1);
  });

  return timeline;
}

$('#playback').click(function() {
  initTimeLine();
});

// PPT相关
function initPPT() {

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
  
}