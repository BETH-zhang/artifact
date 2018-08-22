/*! author:Mr Qiu , date:2018-08-11 */

var LogDevelopment = {
  error: function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      // console.log(console, e)
      console.error.apply(console, e)
  },
  info: function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      console.info.apply(console, e)
  },
  warn: function() {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      console.warn.apply(console, e)
  },
  log: function() {
      if (window.dynamicPptDebug) {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          console.log.apply(console, e)
      }
  },
  trace: function() {
      if (window.dynamicPptDebug) {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          console.trace.apply(console, e)
      }
  },
  debug: function() {
      if (window.dynamicPptDebug) {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          console.debug.apply(console, e)
      }
  }
};
window.dynamicPptLog = LogDevelopment,
window.onload = function() {
  var e = document.createElement("div");
  e.className = "ppt-supernatant",
  e.id = "ppt_supernatant",
  document.body.appendChild(e);
  var t, i, A = document.getElementById("ppt_supernatant");
  window.GLOBAL = window.GLOBAL || {},
  window.isPlayFalg = !0,
  window.GLOBAL.saveVideoSrc = [],
  window.GLOBAL.browser = {
      versions: function() {
          var e = navigator.userAgent;
          navigator.appVersion;
          return {
              trident: -1 < e.indexOf("Trident"),
              presto: -1 < e.indexOf("Presto"),
              webKit: -1 < e.indexOf("AppleWebKit"),
              gecko: -1 < e.indexOf("Gecko") && -1 == e.indexOf("KHTML"),
              mobile: !!e.match(/AppleWebKit.*Mobile.*/),
              ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
              android: -1 < e.indexOf("Android") || -1 < e.indexOf("Linux"),
              iPhone: -1 < e.indexOf("iPhone"),
              iPad: -1 < e.indexOf("iPad"),
              webApp: -1 == e.indexOf("Safari")
          }
      } (),
      language: (navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || navigator.language).toLowerCase()
  },
  window.GLOBAL.isMobile = function() {
      var e = window.GLOBAL.browser;
      return e.versions.mobile || e.versions.ios || e.versions.android || e.versions.iPhone || e.versions.iPad
  },
  t = "https://demodoc.talk-cloud.net/Public/css/newppt.css?ts=2018081012",
  (i = document.createElement("link")).type = "text/css",
  i.rel = "stylesheet",
  i.href = t,
  document.getElementsByTagName("head")[0].appendChild(i),
  window.GLOBAL.onPlayerInit = function(e) {
      function p() {
          var e = document.querySelectorAll("audio"),
          t = document.querySelectorAll("video");
          if (0 < e.length) for (var i = 0; i < e.length; i++) {
              var n = e[i];
              n.volume = parseFloat(window.GLOBAL.PptVolumeValue),
              window.GLOBAL.PptVolumeMute ? n.mute = !0 : n.mute = !1
          }
          if (0 < t.length) for (i = 0; i < t.length; i++) {
              var o = t[i];
              o.volume = parseFloat(window.GLOBAL.PptVolumeValue),
              window.GLOBAL.PptVolumeMute ? o.mute = !0 : o.mute = !1
          }
          var a = e.length + t.length;
          if (a !== window.GLOBAL.totalAudioAndVideoNumber) {
              var r = {
                  action: "allVideoAndAudio",
                  allVideoAndAudioLength: window.GLOBAL.totalAudioAndVideoNumber = a
              };
              window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(r)
          }
      }
      function m(e) {
          var n = window.GLOBAL.newPptAynamicThat.that,
          t = document.getElementsByTagName("audio"),
          o = document.getElementsByTagName("video");
          if ((0 < t.length || 0 < o.length) && window.isPlayFalg && !(window.GLOBAL.isNotPlayAudio && window.GLOBAL.isNotPlayVideo || window.GLOBAL.notPlayAV)) { !
              function() {
                  var e = document.getElementById("testAudio") || document.createElement("audio");
                  e.id = "testAudio",
                  e.src = "https://demodoc.talk-cloud.net/Public/media/test.mp3",
                  document.getElementById("testAudio") || document.body.appendChild(e);
                  try {
                      e.play().then(function() {
                          document.getElementById("testAudio") && (e.pause(), document.body.removeChild(document.getElementById("testAudio"))),
                          window.isPlayFalg = !1
                      }).
                      catch(function(e) {
                          console.error("audio test error---\x3e", e),
                          e && "NotAllowedError" === e.name && (window.isPlayFalg = !1, window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent({
                              action: "againReconnect"
                          })),
                          document.getElementById("testAudio") && document.body.removeChild(document.getElementById("testAudio"))
                      })
                  } catch(e) {
                      dynamicPptLog.error("audio play error:", e)
                  }
              } ()
          }
          if (!window.GLOBAL.isControl) {
              if (0 < t.length) for (var i = t.length - 1; 0 <= i; i--) t[i] && "testAudio" === t[i].id || (e && t[i].pause(), t[i].play = l);
              if (0 < o.length) for (i = o.length - 1; 0 <= i; i--) e && o[i].pause(),
              o[i].play = d
          }
          if (1 <= o.length && window.GLOBAL.isControl) {
              var a = function(i) {
                  window.GLOBAL.addEvents(o[0], i,
                  function() {
                      if (window.GLOBAL.videoInitiative) if ("seeked" === i) window.GLOBAL.clickGoVideoTime && window.GLOBAL.clickGoVideoTime(o[0], window.GLOBAL.videoInitiative);
                      else {
                          var e = {
                              action: "startPlayVideoEvent",
                              videoStatus: i,
                              externalData: {
                                  initiative: window.GLOBAL.videoInitiative
                              }
                          };
                          n.postMessageToParent(e);
                          var t = o[0].parentNode;
                          t.classList.contains("iphone") && t.classList.remove("video_player")
                      }
                  })
              };
              if (window.GLOBAL.isMobile()) a("play"),
              a("pause"),
              a("seeked");
              else {
                  var r = document.getElementsByClassName("controls")[0];
                  window.GLOBAL.isControl ? (r.classList.add("openControl"), a("play"), a("pause")) : r.classList.add("closeControl")
              }
          }
      }
      function l(e, t) {
          window.GLOBAL.notPlayAV || window.GLOBAL.isNotPlayAudio || e || this && this.__proto__ && this.__proto__.play && "function" == typeof this.__proto__.play && this.__proto__.play.apply(this, arguments)
      }
      function d(e, t) {
          if (window.GLOBAL.notPlayAV || window.GLOBAL.isNotPlayVideo || window.GLOBAL.playback);
          else if (e) {
              var i = window.GLOBAL.newPptAynamicThat.that,
              n = this;
              if (t = t || {},
              n) {
                  var o = "new_ppt_video_" + (new Date).getTime();
                  n.setAttribute("id", o);
                  var a = void 0;
                  if ((m = n.querySelectorAll("source")) && 0 < m.length) {
                      for (var r = 0; r < m.length; r++) {
                          var l = m[r];
                          if (l && -1 !== l.getAttribute("type").indexOf("webm")) {
                              a = l.getAttribute("src");
                              break
                          }
                      }
                      if (!a) return void dynamicPptLog.error("video resouce webm url is not exist!", m);
                      for (var d = [], c = 0; c < m.length; c++) d.push(m[c].outerHTML);
                      var s = {
                          src: a,
                          slide: t.pptslide,
                          source: d
                      };
                      if (window.GLOBAL.saveVideoSrc[t.pptslide - 1] = s, n.src = "", m && 0 < m.length) for (c = m.length - 1; 0 <= c; c--) n.removeChild(m[c])
                  } else if (0 < window.GLOBAL.saveVideoSrc.length) {
                      var w = t.pptslide - 1;
                      window.GLOBAL.saveVideoSrc[w].slide == t.pptslide && (a = window.GLOBAL.saveVideoSrc[w].src)
                  }
                  if (a) {
                      var p = {
                          action: "autoPlayVideoInNewPpt",
                          videoElementId: o,
                          isvideo: !0,
                          fileid: window.GLOBAL.fileid,
                          url: a,
                          pptslide: t.pptslide,
                          externalData: t.externalData
                      };
                      i.postMessageToParent(p)
                  }
              }
          } else if (this && this.__proto__ && this.__proto__.play && "function" == typeof this.__proto__.play) {
              if (this) {
                  var m = this.querySelectorAll("source"),
                  L = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().slideIndex();
                  m && m.length <= 0 && (this.innerHTML = window.GLOBAL.saveVideoSrc[L].source.join(""))
              }
              this.__proto__.play.apply(this, arguments)
          }
      }
      window.GLOBAL.newpptPresentationConnector = {},
      window.GLOBAL.NewPptAynamicPPT = function(e) {
          var t = this;
          this.options = e || {},
          this.isResized = !1,
          this.isOpenPptFile = !1,
          t.sendMessagePermission = !1,
          window.GLOBAL.newPptAynamicThat = {
              that: t
          },
          this.aynamicPptData = {
              old: {
                  slide: null,
                  step: null,
                  fileid: null
              },
              now: {
                  slide: null,
                  step: null,
                  fileid: null
              }
          },
          this.recvAynamicPptData = {
              slide: null,
              step: null,
              fileid: null
          },
          this.recvCount = 0,
          t.newDopPresentation(e)
      },
      window.GLOBAL.NewPptAynamicPPT.prototype = {
          constructor: window.GLOBAL.NewPptAynamicPPT,
          newDopPresentation: function(e, t) {
              var c = window.GLOBAL.newPptAynamicThat.that;
              function s(e, t) {
                  if (e) for (var i = e.parentNode,
                  n = 0; n < 200; n++) {
                      if (!i || !/(poster|video_player|video_player poster_frame)/g.test(i.className)) break;
                      i.style.display = t ? "": "none",
                      i = i.parentNode
                  }
              }
              function o(e, t) {
                  var i = window.GLOBAL.browser;
                  if (i.versions.mobile || i.versions.ios || i.versions.android || i.versions.iPhone || i.versions.iPad) if (i.versions.ios && null != window.GLOBAL.deviceType && 0 == parseInt(window.GLOBAL.deviceType)) {
                      var n = {
                          initiative: !0
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      null != t ? t <= e ? window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(!0, n) : e < t && window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(!0, n) : window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(!0, n)
                  } else {
                      if ((l = c.view.displayObject().querySelectorAll("video")) && 0 < l.length) for (var o = 0; o < l.length; o++) { (d = l[o]) && (d.style.display = "", d.volume = parseFloat(window.GLOBAL.PptVolumeValue), d.load(), d.play(), s(d, !0))
                      }
                  } else {
                      var a = c.view.displayObject().querySelectorAll(".controls .component_container.play .component_base.play");
                      if (a && 0 < a.length) {
                          if ((l = c.view.displayObject().querySelectorAll("video")) && 0 < l.length) for (o = 0; o < l.length; o++) { (d = l[o]) && (d.style.display = "", d.volume = parseFloat(window.GLOBAL.PptVolumeValue), d.load(), s(d, !0))
                          }
                          for (o = 0; o < a.length; o++) {
                              var r = a[o];
                              r && "false" == r.getAttribute("aria-pressed") && window.GLOBAL.fireEvent(r, "click")
                          }
                      } else {
                          var l;
                          if ((l = c.view.displayObject().querySelectorAll("video")) && 0 < l.length) for (o = 0; o < l.length; o++) {
                              var d; (d = l[o]) && (d.style.display = "", d.volume = parseFloat(window.GLOBAL.PptVolumeValue), d.load(), d.play(), s(d, !0))
                          }
                      }
                  }
              }
              function a() {
                  var e = c.view.displayObject().querySelectorAll("video");
                  if (e && 0 < e.length) for (var t = 0; t < e.length; t++) {
                      var i = e[t];
                      i && (window.GLOBAL.isControl || (i.style.display = "none", i.removeAttribute("autoplay"), i.removeAttribute("preload"), i.load(), i.pause(), i.volume = 0, s(i)))
                  }
              }
              function r(e, t) {
                  var i = c.view.displayObject().querySelectorAll("video");
                  if (0 < i.length) {
                      var n = i[i.length - 1];
                      if (n) {
                          n.style.display = "none",
                          n.removeAttribute("autoplay"),
                          n.removeAttribute("preload"),
                          n.load(),
                          n.pause();
                          n.volume = 0;
                          var o = {
                              pptslide: e,
                              externalData: t
                          };
                          n.play(!0, o),
                          s(n)
                      }
                  }
              }
              function w(e, t, i) {
                  if (!window.GLOBAL.notPlayAV) if (window.GLOBAL.versions && 2017082901 <= window.GLOBAL.versions) if (window.GLOBAL.playback) a();
                  else try {
                      var n = c.view.displayObject().querySelectorAll("video");
                      n && 0 < n.length && (window.GLOBAL.classbegin ? 2017091401 <= window.GLOBAL.versions && t && t.initiative && window.GLOBAL.publishDynamicPptMediaPermission_video || 2017082901 <= window.GLOBAL.versions && window.GLOBAL.versions < 2017091401 && 0 == window.GLOBAL.role ? r(e, t) : t && t.initiative ? o(e, i) : a() : o(e, i))
                  } catch(e) {
                      return void dynamicPptLog.error("视频播放错误:", e)
                  } else window.GLOBAL.isLoadPageController && o(e, i)
              }
              return c.options = e || c.options,
              c.playbackController = null,
              c.slidesCount = null,
              c.isPlayedPresentation = null,
              c.view = null,
              c.presentation = null,
              c.needUpdateSlideAndStep = !1,
              c.isOpenPptFile = !0,
              window.GLOBAL.newpptPresentationConnector.register = function(e, t) {
                  try {
                      dynamicPptLog.log("receive player and newppt:", e, t),
                      c.presentation = e.presentation(),
                      c.slidesCount = c.presentation.slides().count(),
                      c.view = e.view(),
                      c.viewData = {
                          width: c.view.width(),
                          height: c.view.height()
                      },
                      c.playbackController = c.view.restrictedPlaybackController(),
                      c.slideTransitionController = c.playbackController.slideTransitionController(),
                      function() {
                          try {
                              c.playbackController && c.playbackController.slideChangeEvent && (c.playbackController.slideChangeEvent().removeHandler(function(e) {}), c.playbackController.slideChangeEvent().addHandler(function(t, i) {
                                  if (window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray = [], window.dynamicPptLog.log("ChangeEvent slideChangeEvent slideIndex and externalData:", t, i), c.isOpenPptFile) {
                                      var e = c.playbackController.clock().timestamp(),
                                      n = e.stepIndex(),
                                      o = c.nowSlideIndex;
                                      c.nowSlideIndex = t,
                                      n = 0 <= n ? n: 0;
                                      var a = null;
                                      if (c.playbackController && c.playbackController.currentSlide) try {
                                          var r = c.playbackController.currentSlide();
                                          if (r && r.animationSteps) {
                                              var l = r.animationSteps();
                                              r && r.animationSteps && (a = l.count())
                                          }
                                      } catch(e) {
                                          dynamicPptLog.error("that.playbackController.currentSlide error:", e)
                                      }
                                      if (c.isLoadFinshed) {
                                          if (c.isLoadFinshed) try {
                                              var d = {
                                                  action: "slideChangeEvent",
                                                  slide: t,
                                                  step: n,
                                                  stepTotal: a,
                                                  externalData: i
                                              };
                                              c.aynamicPptData.now.slide == t && c.aynamicPptData.now.step == n || c.postMessageToParent(d),
                                              c.videoPlayPPTTimerNum = 0,
                                              clearInterval(c.videoPlayPPTTimer),
                                              m(),
                                              c.videoPlayPPTTimer = setInterval(function() {
                                                  c.videoPlayPPTTimerNum++;
                                                  var e = c.playbackController.playbackState();
                                                  dynamicPptLog.log("slide setInterval  videoPlayPPTTimerNum 、 playbackState、slideTransitionControllerState:", c.videoPlayPPTTimerNum, e, c.slideTransitionController.state()),
                                                  /(playingSlide|pausedSlide|suspended)/g.test(e) && "playing" !== c.slideTransitionController.state() ? (m(), w(t, i, o), p(), clearInterval(c.videoPlayPPTTimer), c.videoPlayPPTTimerNum = 0) : 30 < c.videoPlayPPTTimerNum && (clearInterval(c.videoPlayPPTTimer), c.videoPlayPPTTimerNum = 0)
                                              },
                                              300)
                                          } catch(e) {
                                              dynamicPptLog.error("OnSlideChange", e)
                                          }
                                      } else {
                                          c.isLoadFinshed = !0;
                                          var d = {
                                              action: "initEvent",
                                              view: c.viewData,
                                              slidesCount: c.slidesCount,
                                              slide: t,
                                              step: n,
                                              stepTotal: a,
                                              externalData: i
                                          };
                                          c.postMessageToParent(d),
                                          c.videoPlayPPTTimerNum = 0,
                                          clearInterval(c.videoPlayPPTTimer),
                                          m(),
                                          c.videoPlayPPTTimer = setInterval(function() {
                                              c.videoPlayPPTTimerNum++;
                                              var e = c.playbackController.playbackState();
                                              dynamicPptLog.log("slide setInterval  videoPlayPPTTimerNum 、 playbackState、slideTransitionControllerState:", c.videoPlayPPTTimerNum, e, c.slideTransitionController.state()),
                                              /(playingSlide|pausedSlide|suspended)/g.test(e) && "playing" !== c.slideTransitionController.state() ? (m(), w(t, i, o), p(), clearInterval(c.videoPlayPPTTimer), c.videoPlayPPTTimerNum = 0) : 30 < c.videoPlayPPTTimerNum && (clearInterval(c.videoPlayPPTTimer), c.videoPlayPPTTimerNum = 0)
                                          },
                                          300),
                                          setTimeout(function() {
                                              window.GLOBAL.fireEvent(window, "resize")
                                          },
                                          100)
                                      }
                                      c.aynamicPptData.now.slide = t,
                                      c.aynamicPptData.now.step = 0 <= n ? n: 0
                                  }
                                  c.canJumpToAnim(),
                                  window.GLOBAL.checkCustomControllerButtonState && window.GLOBAL.checkCustomControllerButtonState()
                              })),
                              c.playbackController && c.playbackController.stepChangeEvent && (c.playbackController.stepChangeEvent().removeHandler(function(e) {}), c.playbackController.stepChangeEvent().addHandler(function(e, t) {
                                  if (window.dynamicPptLog.log("ChangeEvent stepChangeEvent stepIndex and externalData:", e, t), c.isOpenPptFile) {
                                      var i = c.playbackController.clock().timestamp(),
                                      n = i.slideIndex(),
                                      o = null;
                                      if (c.playbackController && c.playbackController.currentSlide) try {
                                          var a = c.playbackController.currentSlide();
                                          if (a && a.animationSteps) {
                                              var r = a.animationSteps();
                                              a && a.animationSteps && (o = r.count())
                                          }
                                      } catch(e) {
                                          dynamicPptLog.error("that.playbackController.currentSlide error:", e)
                                      }
                                      if (e = 0 <= e ? e: 0, c.OnMovToPrvAnimTimer = c.OnMovToPrvAnimTimer || null, c.isLoadFinshed) {
                                          try {
                                              var l = {
                                                  action: "stepChangeEvent",
                                                  slide: n,
                                                  step: e,
                                                  stepTotal: o,
                                                  externalData: t
                                              };
                                              c.aynamicPptData.now.slide == n && c.aynamicPptData.now.step == e || c.postMessageToParent(l)
                                          } catch(e) {
                                              dynamicPptLog.error("OnMovToPrvAnim", e)
                                          }
                                          var d = n;
                                          c.remoteActionDataJson && c.remoteActionDataJson["remoteActionData_" + d] && 0 < c.remoteActionDataJson["remoteActionData_" + d].length && c.remoteActionDataArrHandler(c.remoteActionDataJson["remoteActionData_" + d])
                                      }
                                      c.aynamicPptData.now.slide = n,
                                      c.aynamicPptData.now.step = 0 <= e ? e: 0
                                  }
                                  c.canJumpToAnim(),
                                  window.GLOBAL.checkCustomControllerButtonState && window.GLOBAL.checkCustomControllerButtonState()
                              })),
                              c.playbackController && c.playbackController.navigationRestrictedEvent && c.playbackController.navigationRestrictedEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Navigation action", e.navigationAction(), "is restricted by", e.restrictionSource(), "for the following reason:", e.restrictionReason().type())
                              }),
                              c.playbackController && c.playbackController.playbackCompleteEvent && c.playbackController.playbackCompleteEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Presentation playback has been completed."),
                                  c.canJumpToAnim()
                              });
                              var e = c.playbackController.clock();
                              e.stateChangeEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Clock state has been changed to", e.state()),
                                  c.canJumpToAnim()
                              }),
                              e.stopEvent().addHandler(function(e) {
                                  var t = e.timestamp();
                                  window.dynamicPptLog.log("Clock has been stopped at slide:", t.slideIndex(), "step:", t.stepIndex(), "time offset:", t.timeOffset()),
                                  c.canJumpToAnim()
                              }),
                              e.bufferStateChangeEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Clock buffering state has been changed to", e.buffering()),
                                  c.canJumpToAnim()
                              }),
                              e.startEvent().addHandler(function(e) {
                                  var t = e.timestamp();
                                  window.dynamicPptLog.log("Clock has been started at slide:", t.slideIndex(), "step:", t.stepIndex(), "time offset:", t.timeOffset()),
                                  c.canJumpToAnim()
                              }),
                              c.playbackController.navigationRestrictedEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Navigation action", e.navigationAction(), "is restricted by", e.restrictionSource(), "for the following reason:", e.restrictionReason().type())
                              }),
                              c.slideTransitionController.transitionEffectCompleteEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Transition to slide #" + e + " has been completed."),
                                  c.canJumpToAnim()
                              }),
                              c.slideTransitionController.transitionEffectStartEvent().addHandler(function(e) {
                                  window.dynamicPptLog.log("Transition to slide #" + e + " has been started.")
                              })
                          } catch(e) {
                              dynamicPptLog.error("initPlaybackControllerEventsHandlers error:", e)
                          }
                      } (),
                      m(!0)
                  } catch(e) {
                      dynamicPptLog.error("register error:", e)
                  }
              },
              c.clearOldSlideInfo = function() {
                  a()
              },
              c.closeDynamicPptAutoVideo = function() {
                  a()
              },
              c.classBeginCheckAutoPlay = function(e, t) {
                  if (0 == window.GLOBAL.role && window.GLOBAL.classbegin) {
                      if (void 0 === e) e = c.playbackController.clock().timestamp().slideIndex();
                      t = t || {
                          initiative: !0
                      },
                      a(),
                      r(e, t)
                  }
              },
              c
          },
          jumpToAnim: function(e, t, i, n, o) {
              try {
                  var a, r, l = window.GLOBAL.newPptAynamicThat.that;
                  l.jumpToAnimData = null,
                  a = 0 <= (a = e - 1) ? a: 0,
                  r = 0 <= (r = t) ? r: 0,
                  i = null != i ? i: 0,
                  n = null == n || n;
                  var d = l.playbackController.clock().timestamp(),
                  c = d.slideIndex(),
                  s = 0 <= d.stepIndex() ? d.stepIndex() : 0;
                  if (dynamicPptLog.log("nowSlideIndex and nowStepIndex:", c, s, "\n slideIndex and stepIndex:", a, r), a === c && r === s) {
                      try {
                          var w = null;
                          if (l.playbackController && l.playbackController.currentSlide) try {
                              var p = l.playbackController.currentSlide();
                              if (p && p.animationSteps) {
                                  var m = p.animationSteps();
                                  p && p.animationSteps && (w = m.count())
                              }
                          } catch(e) {
                              dynamicPptLog.error("that.playbackController.currentSlide error:", e)
                          }
                          var L = {
                              action: "slideChangeEvent",
                              slide: a,
                              step: r,
                              stepTotal: w,
                              externalData: o
                          };
                          l.postMessageToParent(L),
                          l.aynamicPptData.now.slide = a,
                          l.aynamicPptData.now.step = 0 <= r ? r: 0
                      } catch(e) {
                          dynamicPptLog.error("notJumpToAnim error:", e)
                      }
                      return
                  }
                  null != e && null != t ? c === a ? 0 <= r && 0 <= s ? r - s == 1 ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoNextStep"), l.playbackController.gotoNextStep(o)) : s - r == 1 ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoPreviousStep"), l.playbackController.gotoPreviousStep(o)) : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoTimestamp(a, r, i, n, o)) : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoTimestamp(a, r, i, n, o)) : (l.remoteActionDataJson && l.remoteActionDataJson["remoteActionData_" + a] && 0 < l.remoteActionDataJson["remoteActionData_" + a].length && (l.remoteActionDataJson["remoteActionData_" + a].length = 0), a - c == 1 && 0 === r ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoNextSlide"), window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoNextSlide(n, o)) : c - a == 1 && 0 === r ? (dynamicPptLog.log("执行jumpToAnim--\x3egotoPreviousSlide"), window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoPreviousSlide(n, o)) : (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoTimestamp(a, r, i, n, o))) : null != e ? (window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(), l.playbackController.gotoSlide(a, n, o)) : dynamicPptLog.error("slide 和 step必须有值")
              } catch(e) {
                  dynamicPptLog.error("jumpToAnim error:", e)
              }
          },
          canJumpToAnim: function() {
              var e = this,
              t = e.playbackController.playbackState();
              dynamicPptLog.log("canJumpToAnim 当前状态(playbackState and slideTransitionControllerState )：", t, e.slideTransitionController.state(), e.jumpToAnimData ? JSON.stringify(e.jumpToAnimData) : e.jumpToAnimData),
              e.jumpToAnimData && /(playingSlide|pausedSlide|suspended)/g.test(t) && "playing" !== e.slideTransitionController.state() && e.jumpToAnim(e.jumpToAnimData.slide, e.jumpToAnimData.step, e.jumpToAnimData.timeOffset, e.jumpToAnimData.autoStart, e.jumpToAnimData.externalData)
          },
          postMessageToParent: function(e) {
              if (window.parent && window.parent !== window) try {
                  var t = {
                      source: "tk_dynamicPPT",
                      data: e
                  };
                  t = JSON.stringify(t),
                  window.parent.postMessage(t, "*")
              } catch(e) {
                  dynamicPptLog.error("that.postMessageToParent error:", e)
              }
          },
          clickNewpptVideoEventHandler: function(e) {
              window.GLOBAL.isControl && (document.getElementsByTagName("video")[0].currentTime = e.currentTime)
          },
          clickNewpptTriggerEventHandler: function(e) {
              var t = this;
              t.playbackController.clock().timestamp().slideIndex();
              t.remoteActionDataJson = t.remoteActionDataJson || {},
              t.remoteActionDataJson["remoteActionData_" + e.slide] = t.remoteActionDataJson["remoteActionData_" + e.slide] || [],
              t.remoteActionDataJson["remoteActionData_" + e.slide].push(e);
              var i = t.remoteActionDataJson["remoteActionData_" + e.slide];
              t.remoteActionDataArrHandler(i)
          },
          remoteActionDataArrHandler: function(e) {
              for (var t = 0; t < e.length; t++) {
                  var i, n = e[t];
                  if (i = this.view.displayObject().querySelectorAll("#" + n.triggerElementId), dynamicPptLog.log("clickNewpptTriggerEvent handler element:", n.triggerElementId, i), i && 0 < i.length) for (t = 0; t < i.length; t++) {
                      var o = i[t];
                      if (n.childElementTagName && (o = o.getElementsByTagName(n.childElementTagName)[0]), "video" === o.nodeName.toLowerCase()) return;
                      if (o.getElementsByTagName("video") && 0 < o.getElementsByTagName("video").length) return;
                      var a = "click";
                      window.GLOBAL.fireEvent(o, a);
                      a = "touchstart";
                      window.GLOBAL.fireEvent(o, a);
                      a = "touchend";
                      window.GLOBAL.fireEvent(o, a)
                  }
              }
              e.length = 0
          }
      },
      window.GLOBAL.addEvents = function(e, t, i) {
          e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i
      },
      window.GLOBAL.removeEvents = function(e, t, i) {
          e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null
      },
      window.GLOBAL.fireEvent = window.GLOBAL.fireEvent ||
      function(e, t) {
          if (document.createEventObject) {
              var i = {
                  initiative: !1
              };
              return (n = document.createEventObject()).externalData = i,
              e.fireEvent("on" + t, n)
          }
          var n; (n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0);
          i = {
              initiative: !1
          };
          return n.externalData = i,
          !e.dispatchEvent(n)
      },
      window.GLOBAL.initiativeDataDefault = !0,
      window.GLOBAL.externalData = {
          initiative: window.GLOBAL.initiativeDataDefault
      },
      window.GLOBAL.getUrlParams = window.GLOBAL.getUrlParams ||
      function(e) {
          var t = decodeURIComponent(window.location.href),
          i = t.indexOf("?"),
          n = t.substring(i + 1),
          o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
          a = n.match(o);
          return null != a ? a[2] : ""
      },
      window.GLOBAL.videoInitiativeData = !0,
      window.GLOBAL.mClientType = window.GLOBAL.getUrlParams("mClientType"),
      window.GLOBAL.deviceType = window.GLOBAL.getUrlParams("deviceType"),
      window.GLOBAL.fileid = window.GLOBAL.getUrlParams("fileid"),
      window.GLOBAL.fileid = window.GLOBAL.fileid ? Number(window.GLOBAL.fileid) : window.GLOBAL.fileid,
      window.GLOBAL.playback = "true" == window.GLOBAL.getUrlParams("playback") || 1 == window.GLOBAL.getUrlParams("playback"),
      window.GLOBAL.classbegin = "true" == window.GLOBAL.getUrlParams("classbegin") || 1 == window.GLOBAL.getUrlParams("classbegin"),
      window.dynamicPptDebug = !!window.GLOBAL.getUrlParams("dynamicPptDebug") && "true" == window.GLOBAL.getUrlParams("dynamicPptDebug"),
      window.GLOBAL.role = window.GLOBAL.getUrlParams("role"),
      window.GLOBAL.dynamicPptActionClick = !window.GLOBAL.getUrlParams("dynamicPptActionClick") || "true" == window.GLOBAL.getUrlParams("dynamicPptActionClick"),
      window.GLOBAL.newpptPagingPage = !!window.GLOBAL.getUrlParams("newpptPagingPage") && "true" == window.GLOBAL.getUrlParams("newpptPagingPage"),
      window.GLOBAL.publishDynamicPptMediaPermission_video = "true" == window.GLOBAL.getUrlParams("publishDynamicPptMediaPermission_video") || 1 == window.GLOBAL.getUrlParams("publishDynamicPptMediaPermission_video"),
      window.GLOBAL.PptVolumeValue = window.GLOBAL.getUrlParams("PptVolumeValue") ? parseFloat(window.GLOBAL.getUrlParams("PptVolumeValue")) : 1,
      window.GLOBAL.notPlayAV = !!window.GLOBAL.getUrlParams("notPlayAV") && "true" == window.GLOBAL.getUrlParams("notPlayAV"),
      window.GLOBAL.PptVolumeMute = !!window.GLOBAL.getUrlParams("PptVolumeMute") && "true" == window.GLOBAL.getUrlParams("PptVolumeMute"),
      window.GLOBAL.isNotPlayAudio = !!window.GLOBAL.getUrlParams("isNotPlayAudio") && "true" == window.GLOBAL.getUrlParams("isNotPlayAudio"),
      window.GLOBAL.isNotPlayVideo = !!window.GLOBAL.getUrlParams("isNotPlayVideo") && "true" == window.GLOBAL.getUrlParams("isNotPlayVideo"),
      window.GLOBAL.isLoadPageController = window.GLOBAL.getUrlParams("isLoadPageController"),
      window.GLOBAL.isControl = "true" == window.GLOBAL.getUrlParams("control") && window.GLOBAL.getUrlParams("control"),
      window.GLOBAL.languageName = window.GLOBAL.browser.language && window.GLOBAL.browser.language.toLowerCase().match(/zh/g) ? "chinese": "english",
      window.GLOBAL.versions = window.GLOBAL.getUrlParams("versions"),
      window.GLOBAL.versions = window.GLOBAL.versions ? Number(window.GLOBAL.versions) : window.GLOBAL.versions,
      window.GLOBAL.ServiceNewPptAynamicPPT = new window.GLOBAL.NewPptAynamicPPT,
      window.GLOBAL.actionHandlerFunction = function(e) {
          try {
              switch (e.action) {
              case "userTriggerAudio":
                  if (document.getElementById("testAudio")) document.getElementById("testAudio").play(),
                  document.body.removeChild(document.getElementById("testAudio"));
                  else {
                      var t = document.createElement("audio");
                      t.id = "testAudio",
                      t.src = "https://demodoc.talk-cloud.net/Public/media/test.mp3",
                      document.body.appendChild(t),
                      t.play(),
                      document.body.removeChild(t)
                  }
                  break;
              case "startPlayVideoEvent":
                  if (window.GLOBAL.isControl) {
                      window.GLOBAL.videoInitiative = e.externalData.initiative;
                      var i = document.getElementsByTagName("video")[0];
                      if (window.GLOBAL.isMobile()) {
                          if ("play" == e.videoStatus)(n = i.parentNode).classList.contains("iphone") && n.classList.remove("video_player"),
                          i.play();
                          else i.pause()
                      } else {
                          var n, o = (n = i.parentNode).getElementsByClassName("component_container")[0].getElementsByClassName("component_base")[0];
                          "play" == e.videoStatus ? (n.classList.remove("poster_frame"), o.classList.add("selected"), i.play()) : (o.classList.remove("selected"), i.pause())
                      }
                  }
                  break;
              case "getVideoData":
                  if (window.GLOBAL.isControl) if ((i = document.getElementsByTagName("video")) && 0 < i.length) {
                      e = {
                          action: "getVideoData",
                          currentTime: i[0].currentTime,
                          duration: i[0].duration,
                          externalData: {
                              initiative: !1
                          }
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(e)
                  }
                  break;
              case "clickNewpptVideoEvent":
                  window.GLOBAL.isControl && window.GLOBAL.ServiceNewPptAynamicPPT.clickNewpptVideoEventHandler(e);
                  break;
              case "jumpToAnim":
                  window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData = e.data || {};
                  var a = {
                      initiative: window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData.initiative
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.jumpToAnimData.externalData = a,
                  window.GLOBAL.ServiceNewPptAynamicPPT.canJumpToAnim();
                  break;
              case "gotoPreviousStep":
                  if (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().stepIndex() <= 0) {
                      a = {
                          initiative: !0
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(!0, a)
                  } else {
                      a = {
                          initiative: !0
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousStep(a)
                  }
                  break;
              case "gotoNextStep":
                  a = {
                      initiative: !0
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep(a);
                  break;
              case "gotoPreviousSlide":
                  a = {
                      initiative: !0
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(e.autoStart, a);
                  break;
              case "gotoNextSlide":
                  a = {
                      initiative: !0
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(e.autoStart, a);
                  break;
              case "resizeHandler":
                  dynamicPptLog.log("resizeHandler width and height:", e.width, e.height),
                  window.GLOBAL.ServiceNewPptAynamicPPT.view.resize(e.width, e.height),
                  setTimeout(function() {
                      window.GLOBAL.fireEvent(window, "resize")
                  },
                  250);
                  break;
              case "clickNewpptTriggerEvent":
                  window.GLOBAL.ServiceNewPptAynamicPPT.clickNewpptTriggerEventHandler(e);
                  break;
              case "changeClassBegin":
                  window.GLOBAL.classbegin = e.classbegin;
                  break;
              case "changePublishDynamicPptMediaPermission_video":
                  window.GLOBAL.publishDynamicPptMediaPermission_video = e.publishDynamicPptMediaPermission_video;
                  break;
              case "closeDynamicPptAutoVideo":
                  window.GLOBAL.ServiceNewPptAynamicPPT.closeDynamicPptAutoVideo();
                  break;
              case "classBeginCheckAutoPlay":
                  window.GLOBAL.ServiceNewPptAynamicPPT.classBeginCheckAutoPlay();
                  break;
              case "changeDynamicPptActionClick":
                  window.GLOBAL.dynamicPptActionClick = e.dynamicPptActionClick,
                  window.GLOBAL.dynamicPptActionClick ? A.style.display = "none": A.style.display = "block";
                  break;
              case "changeNewpptPagingPage":
                  window.GLOBAL.newpptPagingPage = e.newpptPagingPage;
                  break;
              case "stopDynamicPpt":
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.pause(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray = [];
                  for (var r = document.querySelectorAll("audio"), l = 0; l < r.length; l++) { (d = r[l]) && !d.paused && (window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray.push(d), d.pause())
                  }
                  break;
              case "playDynamicPpt":
                  if (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.play(!1), window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray && 0 < window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray.length) for (l = 0; l < window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray.length; l++) {
                      var d; (d = window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray[l]) && d.paused && d.play()
                  }
                  window.GLOBAL.ServiceNewPptAynamicPPT.pauseAudioArray = [];
                  break;
              case "PptVolumeControl":
                  window.GLOBAL.PptVolumeValue = parseFloat(e.volumeValue),
                  p();
                  break;
              case "ExtendedNotice":
                  e.extendedData && "updateMute" === e.extendedData.type && e.extendedData.data && (window.GLOBAL.PptVolumeMute = e.extendedData.data.mute, p())
              }
          } catch(e) {
              dynamicPptLog.error("actionHandlerFunction error:", e)
          }
      },
      window.GLOBAL.getParents = function(e, t) {
          try {
              void 0 === t && (t = "document");
              for (var i = [], n = e, o = 0;;) {
                  var a = n;
                  if (!a) break;
                  if (a && a.getAttribute("id")) {
                      i.push(a);
                      break
                  }
                  if (n = a.parentNode, 150 < ++o) break
              }
              return i
          } catch(e) {
              dynamicPptLog.error("getParents error:", e)
          }
      },
      window.GLOBAL.clickGoVideoTime = function(e, t) {
          if (window.GLOBAL.isControl && e) {
              var i = e,
              n = i.duration,
              o = {
                  action: "clickNewpptVideoEvent",
                  currentTime: i.currentTime,
                  duration: n,
                  externalData: {
                      initiative: t
                  }
              };
              window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(o)
          }
      },
      window.GLOBAL.clickTriggerElementToNewPpt = function(e, t) {
          var i = e.target,
          n = e.currentTarget;
          window.dynamicPptLog.log("点击触发器，节点数据[target , currentTarget , externalData]:", i, n, t);
          var o = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp(),
          a = o.slideIndex(),
          r = 0 <= o.stepIndex() ? o.stepIndex() : 0,
          l = null;
          if (!i.getAttribute("id") && !n.getAttribute("id")) {
              var d = window.GLOBAL.getParents(n);
              d && 0 < d.length && (l = d[0].getAttribute("id"))
          }
          var c = {
              action: "clickNewpptTriggerEvent",
              slide: a,
              step: r,
              triggerElementId: i.getAttribute("id") || n.getAttribute("id") || l,
              externalData: t
          };
          l && (c.childElementTagName = n.nodeName),
          window.GLOBAL.ServiceNewPptAynamicPPT.postMessageToParent(c)
      };
      var t = function(i) {
          clearTimeout(window.GLOBAL.documentTimer),
          window.GLOBAL.documentTimer = setTimeout(function() {
              if (window.GLOBAL.newpptPagingPage) switch (i.keyCode) {
              case 39:
                  var e = !0,
                  t = {
                      initiative: !0
                  };
                  return window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(e, t),
                  i.preventDefault(),
                  i.stopPropagation(),
                  !1;
              case 37:
                  e = !0,
                  t = {
                      initiative: !0
                  };
                  return window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(e, t),
                  i.preventDefault(),
                  i.stopPropagation(),
                  !1;
              case 38:
                  if (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().stepIndex() <= 0) {
                      e = !0,
                      t = {
                          initiative: !0
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                      window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(e, t)
                  } else {
                      t = {
                          initiative: !0
                      };
                      window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousStep(t)
                  }
                  return i.preventDefault(),
                  i.stopPropagation(),
                  !1;
              case 40:
                  t = {
                      initiative: !0
                  };
                  return window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep(t),
                  i.preventDefault(),
                  i.stopPropagation(),
                  !1
              }
          },
          400)
      };
      window.GLOBAL.removeEvents(document, "keydown", t),
      window.GLOBAL.addEvents(document, "keydown", t),
      document.oncontextmenu = null,
      document.oncontextmenu = function() {
          return ! 1
      };
      var i = function(e) {
          try {
              if (dynamicPptLog.log("receive remote iframe's parent  data form " + e.origin + ":", e), e.data) {
                  var t = JSON.parse(e.data);
                  "tk_dynamicPPT" === t.source && window.GLOBAL.actionHandlerFunction(t.data)
              }
          } catch(e) {
              dynamicPptLog.error("message Event form iframe :", e)
          }
      };
      window.GLOBAL.removeEvents(window, "message", i),
      window.GLOBAL.addEvents(window, "message", i),
      window.GLOBAL.dynamicPptActionClick ? A.style.display = "none": A.style.display = "block",
      window.GLOBAL.newpptPresentationConnector.register(e);
      var n = document.getElementById("preloader");
      if (n.parentNode.removeChild(n), window.GLOBAL.isLoadPageController) {
          var r = document.createElement("div");
          r.id = "customPageController",
          r.style.display = "none",
          r.className = "custom-page-controller";
          var c = document.createElement("button");
          c.id = "customController_prevSlide",
          c.className = "prev-slide",
          c.innerHTML = "chinese" === window.GLOBAL.languageName ? "上一页": "Previous Page",
          c.onclick = function(e) {
              window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(!0, {
                  initiative: !0
              })
          },
          r.appendChild(c);
          var s = document.createElement("button");
          s.id = "customController_prevStep",
          s.className = "prev-step",
          s.innerHTML = "chinese" === window.GLOBAL.languageName ? "上一帧": "Previous Step",
          s.onclick = function(e) {
              if (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().stepIndex() <= 0) {
                  var t = {
                      initiative: !0
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousSlide(!0, t)
              } else {
                  t = {
                      initiative: !0
                  };
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoPreviousStep(t)
              }
          },
          r.appendChild(s);
          var w = document.createElement("input");
          w.id = "customController_skipSlide",
          w.className = "skip-slide",
          w.type = "number",
          w.setAttribute("placeholder", "chinese" === window.GLOBAL.languageName ? "请输入需要跳转的页数": "Please enter the number of pages to jump"),
          w.onchange = function(e) {
              var t = Number(this.value);
              if ("number" == typeof t) {
                  if (t < 1) {
                      alert("chinese" === window.GLOBAL.languageName ? "跳转的页数不能小于1": "The page number of the jump cannot be less than 1.");
                      var i = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().slideIndex() + 1;
                      return void(this.value = i)
                  }
                  if (t > window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount) {
                      alert("chinese" === window.GLOBAL.languageName ? "跳转的页数不能大于" + window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount: "The page number of the jump cannot be greater than " + window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount);
                      i = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp().slideIndex() + 1;
                      return void(this.value = i)
                  }
                  window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo();
                  window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoTimestamp(t - 1, 0, 0, !0, {
                      initiative: !0
                  })
              }
          },
          r.appendChild(w);
          var L = document.createElement("span");
          L.id = "customController_totalSlideSpan",
          L.className = "total-slide-span",
          L.innerHTML = "&nbsp;/&nbsp;&nbsp;0",
          r.appendChild(L);
          var P = document.createElement("button");
          P.id = "customController_nextStep",
          P.className = "next-step",
          P.innerHTML = "chinese" === window.GLOBAL.languageName ? "下一帧": "Next Step",
          P.onclick = function(e) {
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextStep({
                  initiative: !0
              })
          },
          r.appendChild(P);
          var u = document.createElement("button");
          u.id = "customController_nextSlide",
          u.className = "next-slide",
          u.innerHTML = "chinese" === window.GLOBAL.languageName ? "下一页": "Next Page",
          u.onclick = function(e) {
              window.GLOBAL.ServiceNewPptAynamicPPT.clearOldSlideInfo(),
              window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.gotoNextSlide(!0, {
                  initiative: !0
              })
          },
          r.appendChild(u),
          document.body.appendChild(r),
          window.GLOBAL.checkCustomControllerButtonState = function() {
              if (window.GLOBAL.ServiceNewPptAynamicPPT && window.GLOBAL.ServiceNewPptAynamicPPT.playbackController) {
                  r.style.display = "",
                  L.innerHTML = "&nbsp;/&nbsp;&nbsp;" + window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount;
                  var e = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.clock().timestamp(),
                  t = e.slideIndex() + 1,
                  i = 0 <= e.stepIndex() ? e.stepIndex() : 0,
                  n = null;
                  if (window.GLOBAL.ServiceNewPptAynamicPPT.playbackController && window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.currentSlide) try {
                      var o = window.GLOBAL.ServiceNewPptAynamicPPT.playbackController.currentSlide();
                      if (o && o.animationSteps) {
                          var a = o.animationSteps();
                          o && o.animationSteps && (n = a.count())
                      }
                  } catch(e) {
                      dynamicPptLog.error("that.playbackController.currentSlide error:", e)
                  }
                  t <= 1 ? c.setAttribute("disabled", !0) : c.removeAttribute("disabled"),
                  t >= window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount ? u.setAttribute("disabled", !0) : u.removeAttribute("disabled"),
                  t <= 1 && i <= 0 ? s.setAttribute("disabled", !0) : s.removeAttribute("disabled"),
                  t >= window.GLOBAL.ServiceNewPptAynamicPPT.slidesCount && n - 1 <= i ? P.setAttribute("disabled", !0) : P.removeAttribute("disabled"),
                  w.value = t
              }
          }
      }
  };
  try {
      startPlaying()
  } catch(e) {
      dynamicPptLog.error("动态PPT出现错误，错误信息:", e)
  }
};