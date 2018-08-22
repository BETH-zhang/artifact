$script.ready(['lib'], function() {'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Command = (function () {
    function Command(data) {
        _classCallCheck(this, Command);

        this.defer = $.Deferred();
        this.id = data.id;
    }

    _createClass(Command, [{
        key: 'resolve',
        value: function resolve() {
            return this.defer.resolve(this);
        }
    }, {
        key: 'reject',
        value: function reject() {
            return this.defer.reject();
        }
    }, {
        key: 'stop',
        value: function stop() {}
    }, {
        key: 'promise',
        get: function get() {
            return this.defer.promise();
        }
    }]);

    return Command;
})();

var ClickCommand = (function (_Command) {
    _inherits(ClickCommand, _Command);

    function ClickCommand(data) {
        _classCallCheck(this, ClickCommand);

        _get(Object.getPrototypeOf(ClickCommand.prototype), 'constructor', this).call(this, data);
    }

    _createClass(ClickCommand, [{
        key: 'play',
        value: function play() {
            var self = this;
            tt.timelineResume(this, function () {
                if (self.paused) {
                    self.paused.promise().done(function () {
                        self.resolve();
                    });
                } else {
                    self.resolve();
                }
            });
            return this.promise;
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.paused = $.Deferred();
        }
    }, {
        key: 'resume',
        value: function resume() {
            this.paused.resolve();
        }
    }]);

    return ClickCommand;
})(Command);

var AudioCommand = (function (_Command2) {
    _inherits(AudioCommand, _Command2);

    function AudioCommand(data) {
        _classCallCheck(this, AudioCommand);

        _get(Object.getPrototypeOf(AudioCommand.prototype), 'constructor', this).call(this, data);
        var media_url = data.media_url || "";
        this.path = /^http/.test(media_url) ? media_url : [TTCDN.replace(/\/$/, ''), media_url.replace(/^\//, '')].join("/");
        if (!media_url) {
            this.path = "";
        }
        this.duration = data.duration;
    }

    _createClass(AudioCommand, [{
        key: 'play',
        value: function play() {
            this.sound = tt.playVoice(this);
            return this.promise;
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.sound && this.sound.pause();
        }
    }, {
        key: 'pause',
        value: function pause() {
            tt.pauseVoice(this);
        }
    }, {
        key: 'resume',
        value: function resume() {
            tt.resumeVoice(this);
        }
    }]);

    return AudioCommand;
})(Command);

var commandMapping = {
    "click": ClickCommand,
    "voice": AudioCommand
};

var CommandCollection = (function () {
    function CommandCollection(data) {
        _classCallCheck(this, CommandCollection);

        this.data = data;
    }

    _createClass(CommandCollection, [{
        key: 'play',
        value: function play(options) {
            var self = this;
            var onProgress = options.onProgress;
            this.playStopped = false;
            return this.actions.reduce(function (last, v) {
                last.done(function (item) {
                    if (self.playStopped) {
                        v.reject();
                        return;
                    };
                    self.lastPlaying = v;
                    v.play();
                    onProgress(v);
                });
                return v.promise;
            }, { done: function done(callback) {
                    setTimeout(callback);
                } });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.playStopped = true;
            if (this.lastPlaying) {
                this.lastPlaying.stop();
                this.lastPlaying.reject();
            }
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.lastPlaying) {
                this.lastPlaying.pause();
            }
        }
    }, {
        key: 'resume',
        value: function resume() {
            if (this.lastPlaying) {
                this.lastPlaying.resume();
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.actions = this.data.map(function (i) {
                return new commandMapping[i.type](i);
            });
        }
    }, {
        key: 'preparePlay',
        value: function preparePlay() {
            this.reset();
        }
    }, {
        key: 'renderProgress',
        value: function renderProgress() {
            var audios = this.actions.filter(function (i) {
                return i.constructor == AudioCommand;
            });
            var total = audios.reduce(function (last, v) {
                return last + v.duration;
            }, 0);

            var click_count = this.actions.length - audios.length;
            var click_span = Math.min(0.02, 0.5 / click_count);
            var audio_total = 1 - click_count * click_span;

            return this.actions.map(function (action) {
                if (action.constructor == AudioCommand) {
                    return '<span class=\'audio-bar\' id=\'item-' + action.id + '\' style=\'width: ' + action.duration / total * audio_total * 100 + '%; animation-duration: ' + action.duration + 's; -webkit-animation-duration: ' + action.duration + 's\'></span>';
                } else {
                    return '<span class=\'click-bar\' id=\'item-' + action.id + '\' style=\'width: ' + click_span * 100 + '%\'></span>';
                }
            }).join("");
        }
    }]);

    return CommandCollection;
})();


var introDefer = $.Deferred();
$(document.body).on("complete", function(){

})
var TTCDN = window.CDN || "//v5.ppj.io"
$("#intro").on("click", function(){
    var  self = this;
    var track = document.getElementById("track");
    track.pause()
    track.src = (window.commonCDN || TTCDN) + "/common/silence.mp3?v=2"
    var callback = function(){
        setTimeout(function(){
            $(self).fadeOut(function(){
                introDefer.resolve(); 
            })
            track.removeEventListener("canplaythrough", callback)
        })
    }
    track.addEventListener("canplaythrough", callback)
    track.play();
    tt.emit("startPlay");

})
$(document.body).on("initSlide", function(event, i){
        tt.beforeInit(i)
})
var PLAY_EVENT = window.FEATURES && FEATURES.lazyPlay ? "playTimeline" : "playSlide";
$(document.body).on(PLAY_EVENT, function(event, i){
    introDefer.promise().done(function(){
        if (!window.slides[i].window.main && window.slides[i].noPlay !== true){
            var t = 4;
            var j = setInterval(function(){
                if (!window.slides[i].window.main && window.slides[i].noPlay !== true && t) {
                    t--;
                    return;
                }
                tt.initSlide(i);
                clearInterval(j)
            }, 200)
        } else {
            tt.initSlide(i);
        }
    })
})
$(document.body).on("beforeOnPause", function(event, label, index){
    if (!tt.slides[index]){
        tt.timelineResume();
    }
    return false;
});
$(document.body).on("slideComplete", function(event, index){
    // 如果没有声音，启用slide自带的切换模式
    if (!tt.isCurrentPageEmpty()) return false;
})
$(document.body).on("beforePlay", function(event, index){
    return introDefer.promise();
})



window.tt = (function(){
    var pages;

    return {
        event: $({}),
        emit : function(){
            this.event.trigger.apply(this.event, arguments);
        },
        on: function(event, callback){
            this.event.on(event, function(){
                callback && callback.apply(undefined, Array.prototype.slice.call(arguments, 1));
            })
        },
        one: function(event, callback){
            this.event.one(event, function(){
                callback && callback.apply(undefined, Array.prototype.slice.call(arguments, 1));
            })
        },
        slides: pages,
        init: function(res){
            this.slides = pages = Object.keys(res.data).reduce(function(last, k){
                last[k] = new CommandCollection(res.data[k]);
                return last;
            }, {});

            tt.emit("init", res);

        },
        beforeInit: function(i){
            var slide = window.slides[i];
            var original = slide.transition || {};
            slide.transition = { effect: original.effect, duration: original.duration }
            if (this.isEmptyPage(this.slides[i]) && original.autoAdvance){
                slide.transition.autoAdvance = original.autoAdvance;
            }
        },
        isEmptyPage: function(page){
            return !page || ((page.data || []).filter(function(i){ return i.type == 'voice'}).length == 0)
        },
        isCurrentPageEmpty:function(){
            return this.isEmptyPage(this.currentPage);
        },
        initSlide: function(i){
            if (this.currentPage){
                this.currentPage.stop();
            }
            tt.emit("initSlide", i)
            var page = pages[i], self = this;
            this.timeline = window.slides[i].window.main;
            this.slideBody = window.slides[i].slideBody;
            this.currentPage = page;

            $("#progress-bar").contents().remove();

            if (!page) {
                $('#play-btn').hide();
                return;
            }
            $('#play-btn').show();
            page.preparePlay();
            $("#progress-bar").append(page.renderProgress());
            page.play({
                onProgress: function(item){
                    $("#item-" + item.id).addClass("playing");
                }    
            }).done(function(){
                //self.slideBody.click();
                if (!self.isCurrentPageEmpty()) frame.nextSlide(i)
            });
        },
        timelineResume: function(command, callback){
            console.log("timeline resume");
            var t = this.timeline;
            if (!t) {
                callback && callback();//setTimeout(callback, 500); 
                return false;
            }
            if (t.paused()){
                t.resume2();
                callback && callback()//setTimeout(callback, 500);
            } else {
                // 由于录音页面bug可能导致多余的clickcommand，需要能正常进行播放
                if (window.FEATURES && FEATURES.lazyPlay && !t._hasPausedChild()){
                    t.resume2();
                    callback && callback()
                    return;
                }
                $(document.body).one("beforeOnPause." + command.id, function(event, label, index){
                    t.resume2();
                    callback && callback()//setTimeout(callback, 500)
                    return false;
                })
                /*
                setTimeout(function(){
                    t.resume2();
                    callback && callback()//setTimeout(callback, 500)
                    $(document.body).off("beforeOnPause." + command.id)
                },1000)*/
            }
        },
        playVoice: function(voice){
            if (!voice.path) {
                setTimeout(function(){
                    voice.resolve();
                }, voice.duration * 1000)
                console.error("empty path", voice)
                return v;
            }
            console.log("play voice!!!");
            var v = document.getElementById("track"); //new Audio();
            var path = voice.path
            v.pause();
            v.src = path
            v.play();
            $(v).one("ended error", function(){
                if (v.src.indexOf(path) == -1) return;
                console.log("ended");
                voice.resolve();
            })
            return v;

        },
        pauseVoice: function(voice){
            var v = document.getElementById("track");
            v.pause();
            $("#item-" + voice.id).addClass('paused');
        },
        resumeVoice: function(voice){
            var v = document.getElementById("track");
            v.play();
            $("#item-" + voice.id).removeClass('paused');
        },
        getIndex: function(){
            return -1;
        }
    }
})();

tt.on("init", function(res){
    if (res.lecturer_info.show_author){
        $("#lecturer-avatar").append($("<img src=" + res.lecturer_info.headimgurl + ">"))
        $("#lecturer-name").text(res.lecturer_info.nickname);
    } else {
        $("#lecture-info").css({ "border-spacing" : "0" }) 
        $("#intro").addClass('for-21tb');
    }
    $("#lecture-title").text(window.wxConfig.shareObj.title)
    $("#lecture-description").text((window.doc_info && doc_info.summary) || window.wxConfig.shareObj.desc)

  
})
function create_toc_list() {
    var len = window.slides.length;
    var container = $("<div>")
    for(var i = 0; i <= len; i++){
        container.append("<li class='page-ref' data-index='" + (i+1) + "'></li>")
    }
    var t = $("#toc ul");
    t.contents().remove()
    t.append(container.contents());
}
tt.on("startPlay", function(){
    

    /*
    $("audio").each(function(i){
        if (this.id !== "track") {
            this.volume = doc_info.bgm_volume || 0.3;
        }
    })
    */
   create_toc_list();
})

tt.on("pause", function(v){
    if (v){
        tt.currentPage.pause();
    } else {
        tt.currentPage.resume();
    }
})

// TOC
tt.on("initSlide", function(i){
    $("#editor-panel #edit-info").attr("data-total", window.slides.length).attr('data-current', i+1).addClass("ff").removeClass("ff");
})

$("#editor-panel #edit-info").on("click", function(){
    if ($("#toc ul li").length <= 1) {
        create_toc_list();
    }
    $("#toc").css("display", "block")
    var list = $("#toc ul")[0];
    if (list.offsetHeight < list.scrollHeight){
        $(list).addClass("with-scroller")
    }
    setTimeout(function(){
        $("#toc").removeClass("hidden");
    }, 200)
})

$(".scroller").on("click", function(event){
    var target = $($.attr(this, 'target'))[0];
    var i = $(event.target).hasClass("prev") ? -1 : 1;
    target.scrollTop = target.scrollTop + i * target.offsetHeight;
    event.stopPropagation();
    event.preventDefault();
})
$("#toc").on("click", function(event){
    $("#toc").addClass("hidden").css("display", 'none');
})
$("#toc").on("click", ".page-ref", function(){
    var i = $.attr(this, 'data-index');
    frame.jumpSlide(parseInt(i) - 1);
})



// Play btn
tt.on("initSlide", function(i){
    $('#play-btn').removeClass('paused')
})
$('#play-btn').on("click", function(){
    if ($(this).hasClass("paused")){
        tt.emit("pause", false)
        $(this).removeClass("paused");
    } else {
        tt.emit("pause", true)
        $(this).addClass("paused");
    }
})


$('#user-panel').css({ background: "none" })
if ($("#loading.default-logo").length){
    $("#intro").append("<div id='footnote'>PP匠 ppj.io</div>")
}
})