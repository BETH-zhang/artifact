(function(current, framework) {

  var music = function() {
    var defaultConfig = {
      status: 0,
      defaultTime: '0:00',
      defaultDuration: '0:00',
      currentTime: '0:00',
      duration: '0:00',
      currentProgress: 0,
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    }

    var secToTime = function (log) {
      var s = Math.floor(log);
      var t;
      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour >= 10) {
          t = hour + ":";
        } else if (hour < 10 && hour > 0 ) {
          t = '0' + hour + ":";
        } else {
          t = '';
        }
    
        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec;
      }
      return t;
    }

    return {
      init: function(autoPlay) {
        this.config = defaultConfig;
        this.audioCtx = $("#myAudio")[0];

        this.initTemplate();

        this.initListener();
        if (autoPlay) {
          this.audioPlay();
        }
      },
      initListener: function() {
        $('.music-pause-btn').click(this.audioPause.bind(this));
        $('.music-play-btn').click(this.audioPlay.bind(this));
        this.audioCtx.onloadstart = this.loadstart;
        this.audioCtx.ondurationchange = this.durationchange;
        this.audioCtx.onloadedmetadata = this.loadedmetadata;
        this.audioCtx.onloadeddata = this.loadeddata;
        this.audioCtx.onprogress = this.progress;
        this.audioCtx.oncanplay = this.canplay;
        this.audioCtx.oncanplaythrough = this.canplaythrough;
      },
      initTemplate: function() {
        this.config.duration = secToTime(this.audioCtx.duration);
        this.config.currentTime = secToTime(this.audioCtx.currentTime);
        this.config.progress = (this.audioCtx.currentTime / this.audioCtx.duration) * 100;
        $('.end-time').html(this.config.duration);
        $('.start-time').html(this.config.currentTime);
        $('.time-bar-bg').css({ width: this.config.progress + 'px' });
      },
      updateProgress: function() {
        if (!this.audioCtx.paused) {
          this.initTemplate();
        }
      },
      loadstart: function(e) {
        console.log('loadstart', e)
      },
      durationchange: function(e) {
        console.log('durationchange', e)
      },
      loadedmetadata: function(e) {
        console.log('loadedmetadata', e);
      },
      loadeddata: function(e) {
        console.log('loadeddata', e);
      },
      progress: function(e) {
        console.log('progress', e);
      },
      canplay: function(e) {
        console.log('canplay', e)
      },
      canplaythrough: function(e) {
        console.log('canplaythrough', e)
      },
      audioPlay: function () {
        this.audioCtx.play();
        $('.music-pause-btn').show();
        $('.music-play-btn').hide();
        $('.icont-rotate').addClass('music-playing');
      },
      audioPause: function () {
        this.audioCtx.pause();
        $('.music-pause-btn').hide();
        $('.music-play-btn').show();
        $('.icont-rotate').removeClass('music-playing');
      },
      audio14: function () {
        this.audioCtx.seek(14)
      },
      audioStart: function () {
        this.audioCtx.seek(0)
      },
    }
  };

  current[framework] = music();
})(window, 'bbMusic')