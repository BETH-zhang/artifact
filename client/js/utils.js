var utils = 'utils';
window[utils] =  {
  // 获取url的参数
  queryString: function() {
    let _queryString = {}
    const _query = window.location.search.substr(1)
    if (!_query) {
      return {}
    }
    const _vars = _query.split('&')
    _vars.forEach((v, i) => {
      const _pair = v.split('=')
      if (!_queryString.hasOwnProperty(_pair[0])) {
        _queryString[_pair[0]] = decodeURIComponent(_pair[1])
      } else if (typeof _queryString[_pair[0]] === 'string') {
        const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])]
        _queryString[_pair[0]] = _arr
      } else {
        _queryString[_pair[0]].push(decodeURIComponent(_pair[1]))
      }
    })
    return _queryString
  },
  isNumber: function(value) {
    return typeof value === 'number';
  }
}

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

function  runBarrager(text){
  var item={'img':'../images/heisenberg.png','info':text};
  $('#ppt').barrager(item);
  return true;
}

var logger = function(type, name, val, text, startTime) {
  var startTime = startTime || (new Date()).getTime();
  if (utils.isNumber(openType)) {
    runBarrager(openText[openType] + name + ':' + val +(text || ''));
    $('#mess').append(Component.Message(type !== 'MC' ? type : 7, name, openText[openType] + val, startTime, text));
  } else {
    runBarrager(name + ':' + val + (text || ''));
    var html = Component.Message(type !== 'MC' ? type : 7, name, val, startTime, text);
    $('#mess').append(html);
  }
  $('#mess').animate({scrollTop: $('.message-' + startTime).offset() ? $('.message-' + startTime).offset().top : 0}, 1000);
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