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

