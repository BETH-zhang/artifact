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
  },
  random: function(min, max) {
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (min > max) {
        var hold = max;
        max = min;
        min = hold;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  LiveIndex: function(name, index, role, title) {
    var className = '';
    var value = '';
    console.log(name, index, role, title, '====');
    if (role === 'option1') {
      className = Constant.classNames[1];
      value = '新人';
    } else if (role === 'option2') {
      className = Constant.classNames[5];
      value = '工作汇报';
    } else if (role === 'option3') {
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

var mainFuncs = {
  joinParticipant: function(data) {
    if (!$('.' + data.name).length) {
      if (!$('.avatar-' + data.name).length) {
        $('#joinParticipant').append(Component.Avatar(data.name, data.peos.length))
        console.log($('.avatar-' + data.name).offset().top, '--top')
        $('#joinParticipant').animate({scrollTop:$('.avatar-' + data.name).offset().top}, 1000);
      }
      $('.currentNum').html(`当前人数:${data.peos.length}人`)
    }
  },
  joinLiveList: function(lives) {
    if (lives) {
      var livesAry = Object.keys(lives);
      var livesList = livesAry.map(function(item, index) {
        console.log(livesAry, lives, item, '----');
        return Component.LiveIndex(item, index, lives[item].role, lives[item].title);
      })
      $('.share-list').html(livesList.join('')).css({ width: livesAry.length * (120 + 24) + 'px' })
    }
  }
}