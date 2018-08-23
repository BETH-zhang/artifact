/**
 * BBMusic
 * 1.0.0
 * Copyright (c) 2018-08-22 11:32:20 Beth
 * 直播调用PPT
 * depend [jQuery.js, music.css]
 */

(function(current, framework) {
  function isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      /*window.location.href="你的手机版地址";*/
      return true;
    } else {
      /*window.location.href="你的电脑版地址";*/
      return false;
    }
  }

  // 音乐播放
  function backgroundMusic(audio){
    // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    if(audio.paused){
      audio.load();
      audio.play();
    }
    function musicInBrowserHandler() {
      if(audio.paused){
        audio.load();
        audio.play();
      }
      document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 自动播放音乐效果，解决微信自动播放问题
    function musicInWeixinHandler() {
      if(audio.paused){
        audio.load();
        audio.play();
      }
      document.addEventListener("WeixinJSBridgeReady", function () {
        if(audio.paused){
          audio.load();
          audio.play();
        }
      }, false);
      document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
  }

  var music = function(id) {
    function pcHtml() {
      if (!id) {
        console.warn('没有传入元素id');
        return {};
      }
      var ele = document.getElementById(id);
      ele.innerHTML = `
        <div class="audio-src">
          <div class="audio-title">音乐专区</div>
          <!--音频列表-->
          <div class="content-index clearfix js_clickbtn">
            <div class="sourse-img start-rotate">
              <img src="./images/cover.jpg" alt="声波图" class="icont-rotate"/>
              <div class='iconz-rotate'></div>
              <div class='icon-rotate'></div>
            </div>
            <!--音频box-->
            <div class="audio-box clearfix">
              <div bindtap='clickAudio'>
                <img class="music-btn music-pause-btn" src="../../images/pause.png" />
                <img class='music-btn music-play-btn' src="../../images/play.png" />
              </div>
              <span class="start-time">00:00</span>
              <div class="time-bar">
                <img class="time-bar-img" src="//js.ibaotu.com/revision/img/max-shengbo.png" alt="声波图"/>
                <div class='time-bar-bg' style="width: 0px;"></div>
              </div>
              <span class="end-time">00:00</span>
              <audio class='hide' src="" id="myAudio" controls loop></audio>
            </div> 
          </div>
        </div>
      `;
    }

    function mHtml() {
      $('body').append(`
        <div class="audio-src-m">
          <div class="sourse-img-m start-rotate">
            <img src="./images/cover.jpg" alt="声波图" class="icont-rotate"/>
          </div>
          <audio class='hide' src="" id="myAudio" controls loop></audio>
        </div>
      `);
      $('body').append(`
        <div class="apply-music">
          <button class="btn-music" id="apply-music">点我</button>
        </div>
      `);
    }

    var isPc = !isMobile();
    if (!isPc) {
      mHtml();
    } else {
      pcHtml();
    }

    var defaultConfig = {
      status: 0,
      defaultTime: '0:00',
      defaultDuration: '0:00',
      currentTime: '0:00',
      duration: '0:00',
      currentProgress: 0,
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '爱上幼儿园',
      author: '张庭',
      src: '../data/2.mp3',
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
      init: function(config) {
        var me = this;
        this.config = Object.assign({}, defaultConfig, config);
        this.audioCtx = $("#myAudio")[0];
        this.audioCtx.src = this.config.src;

        if (isPc) {
          this.initListener();
        } else {
          backgroundMusic(this.audioCtx);
          $('#apply-music').click(function() {
            me.audioPlay();
            $('.apply-music').hide();
          });
        }
        if (this.config.autoPlay) {
          this.audioPlay();
        }
        $('.icont-rotate').click(function() {
          var className = $(this).attr('class');
          if (className.indexOf('music-playing') >= 0) {
            me.audioPause();
          } else {
            me.audioPlay();
          }
        });
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
      updateTemplate: function() {
        var me = this;
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(function() {
          me.config.duration = secToTime(me.audioCtx.duration);
          me.config.currentTime = secToTime(me.audioCtx.currentTime);
          me.config.progress = (me.audioCtx.currentTime / me.audioCtx.duration) * 100;
          $('.end-time').html(me.config.duration);
          $('.start-time').html(me.config.currentTime);
          $('.time-bar-bg').css({ width: me.config.progress + 'px' }); 

          if (me.audioCtx.currentTime >= me.audioCtx.duration) {
            clearInterval(me.timer);
            me.timer = null;
          }
        }, 1000);
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

        if (isPc) {
          this.updateTemplate();
        }
      },
      audioPause: function () {
        this.audioCtx.pause();
        $('.music-pause-btn').hide();
        $('.music-play-btn').show();
        $('.icont-rotate').removeClass('music-playing');

        if (isPc && this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      changeMusic: function(src) {
        this.audioCtx.src = src;
        this.audioPlay();
      },
      initMusic: function() {
        this.audioPause();
        this.audioCtx.src = this.config.src;
      },
      audio14: function () {
        this.audioCtx.seek(14)
      },
      audioStart: function () {
        this.audioCtx.seek(0)
      },
    }
  };

  current[framework] = music;
})(window, 'BBMusic')