!function(n,t){"undefined"!=typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):this[n]=t()}("$script",function(){function n(n,t){for(var e=0,o=n.length;o>e;++e)if(!t(n[e]))return c;return 1}function t(t,e){n(t,function(n){return!e(n)})}function e(r,u,f){function c(n){return n.call?n():s[n]}function l(){if(!--y){s[v]=1,g&&g();for(var e in m)n(e.split("|"),c)&&!t(m[e],c)&&(m[e]=[])}}r=r[a]?r:[r];var d=u&&u.call,g=d?u:f,v=d?r.join(""):u,y=r.length;return setTimeout(function(){t(r,function n(t,e){return null===t?l():(e||/^https?:\/\//.test(t)||!i||(t=-1===t.indexOf(".js")?i+t+".js":i+t),p[t]?(v&&(h[v]=1),2==p[t]?l():setTimeout(function(){n(t,!0)},0)):(p[t]=1,v&&(h[v]=1),void o(t,l)))})},0),e}function o(n,t){var e,o=u.createElement("script");o.onload=o.onerror=o[d]=function(){o[l]&&!/^c|loade/.test(o[l])||e||(o.onload=o[d]=null,e=1,p[n]=2,t())},o.async=1,o.src=r?n+(-1===n.indexOf("?")?"?":"&")+r:n,f.insertBefore(o,f.lastChild)}var i,r,u=document,f=u.getElementsByTagName("head")[0],c=!1,a="push",l="readyState",d="onreadystatechange",s={},h={},m={},p={};return e.get=o,e.order=function(n,t,o){!function i(r){r=n.shift(),n.length?e(r,i):e(r,t,o)}()},e.path=function(n){i=n},e.urlArgs=function(n){r=n},e.ready=function(o,i,r){o=o[a]?o:[o];var u=[];return!t(o,function(n){s[n]||u[a](n)})&&n(o,function(n){return s[n]})?i():!function(n){m[n]=m[n]||[],m[n][a](i),r&&r(u)}(o.join("|")),e},e.done=function(n){e([null],n)},e});
function onloadCSS(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}!function(e){"use strict";var n=function(n,o,l){var t,i=e.document,a=i.createElement("link");if(o)t=o;else{var d=(i.body||i.getElementsByTagName("head")[0]).childNodes;t=d[d.length-1]}var r=i.styleSheets;a.rel="stylesheet",a.href=n,a.media="only x",t.parentNode.insertBefore(a,o?t:t.nextSibling);var f=function(e){for(var n=a.href,o=r.length;o--;)if(r[o].href===n)return e();setTimeout(function(){f(e)})};return a.onloadcssdefined=f,f(function(){a.media=l||"all"}),a};"undefined"!=typeof module?module.exports=n:e.loadCSS=n}("undefined"!=typeof global?global:this);
window.console=window.console||{log:function(){},warn:function(){},error:function(){}}(function(n,e){"undefined"!=typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):this[n]=e()})("$script",function(){function n(n,e){for(var t=0,o=n.length;o>t;++t)if(!e(n[t]))return u;return 1}function e(e,t){n(e,function(n){return t(n),1})}function t(r,a,c){function u(n){return n.call?n():f[n]}function d(){if(!--g){f[v]=1,w&&w();for(var t in p)n(t.split("|"),u)&&!e(p[t],u)&&(p[t]=[])}}r=r[s]?r:[r];var l=a&&a.call,w=l?a:c,v=l?r.join(""):a,g=r.length;return setTimeout(function(){e(r,function n(e,t){return null===e?d():(t||/^https?:\/\//.test(e)||!i||(e=-1===e.indexOf(".js")?i+e+".js":i+e),m[e]?(v&&(h[v]=1),2==m[e]?d():setTimeout(function(){n(e,!0)},0)):(m[e]=1,v&&(h[v]=1),void o(e,d)))})},0),t}function o(n,e){var t,o=a.createElement("script");o.onload=o.onerror=o[l]=function(){o[d]&&!/^c|loade/.test(o[d])||t||(o.onload=o[l]=null,t=1,m[n]=2,e())},o.async=1,o.src=r?n+(-1===n.indexOf("?")?"?":"&")+r:n,c.insertBefore(o,c.lastChild)}var i,r,a=document,c=a.getElementsByTagName("head")[0],u=!1,s="push",d="readyState",l="onreadystatechange",f={},h={},p={},m={};return t.get=o,t.order=function(n,e,o){!function i(r){r=n.shift(),n.length?t(r,i):t(r,e,o)}()},t.path=function(n){i=n},t.urlArgs=function(n){r=n},t.ready=function(o,i,r){o=o[s]?o:[o];var a=[];return!e(o,function(n){f[n]||a[s](n)})&&n(o,function(n){return f[n]})?i():!function(n){p[n]=p[n]||[],p[n][s](i),r&&r(a)}(o.join("|")),t},t.done=function(n){t([null],n)},t}),function(n){"use strict";var e=function(e,t,o){function i(n){return a.body?n():void setTimeout(function(){i(n)})}var r,a=n.document,c=a.createElement("link"),u=o||"all";if(t)r=t;else{var s=(a.body||a.getElementsByTagName("head")[0]).childNodes;r=s[s.length-1]}var d=a.styleSheets;c.rel="stylesheet",c.href=e,c.media="only x",i(function(){r.parentNode.insertBefore(c,t?r:r.nextSibling)});var l=function(n){for(var e=c.href,t=d.length;t--;)if(d[t].href===e)return n();setTimeout(function(){l(n)})};return c.addEventListener&&c.addEventListener("load",function(){this.media=u}),c.onloadcssdefined=l,l(function(){c.media!==u&&(c.media=u)}),c},t=function(n,e){function t(){!o&&e&&(o=!0,e.call(n))}var o;n.addEventListener&&n.addEventListener("load",t),n.attachEvent&&n.attachEvent("onload",t),"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(t)};"undefined"!=typeof exports?(exports.loadCSS=e,exports.onloadCSS=t):(n.loadCSS=e,n.onloadCSS=t)}("undefined"!=typeof global?global:this),function(){"use strict";function n(n){l.push(n),1==l.length&&d()}function e(){for(;l.length;)l[0](),l.shift()}function t(n){this.a=f,this.b=void 0,this.f=[];var e=this;try{n(function(n){r(e,n)},function(n){a(e,n)})}catch(t){a(e,t)}}function o(n){return new t(function(e,t){t(n)})}function i(n){return new t(function(e){e(n)})}function r(n,e){if(n.a==f){if(e==n)throw new TypeError;var t=!1;try{var o=e&&e.then;if(null!=e&&"object"==typeof e&&"function"==typeof o)return void o.call(e,function(e){t||r(n,e),t=!0},function(e){t||a(n,e),t=!0})}catch(i){return void(t||a(n,i))}n.a=0,n.b=e,c(n)}}function a(n,e){if(n.a==f){if(e==n)throw new TypeError;n.a=1,n.b=e,c(n)}}function c(e){n(function(){if(e.a!=f)for(;e.f.length;){var n=e.f.shift(),t=n[0],o=n[1],i=n[2],n=n[3];try{0==e.a?i("function"==typeof t?t.call(void 0,e.b):e.b):1==e.a&&("function"==typeof o?i(o.call(void 0,e.b)):n(e.b))}catch(r){n(r)}}})}function u(n){return new t(function(e,t){function o(t){return function(o){a[t]=o,r+=1,r==n.length&&e(a)}}var r=0,a=[];0==n.length&&e(a);for(var c=0;c<n.length;c+=1)i(n[c]).c(o(c),t)})}function s(n){return new t(function(e,t){for(var o=0;o<n.length;o+=1)i(n[o]).c(e,t)})}var d,l=[];d=function(){setTimeout(e)};var f=2;t.prototype.g=function(n){return this.c(void 0,n)},t.prototype.c=function(n,e){var o=this;return new t(function(t,i){o.f.push([n,e,t,i]),c(o)})},window.Promise||(window.Promise=t,window.Promise.resolve=i,window.Promise.reject=o,window.Promise.race=s,window.Promise.all=u,window.Promise.prototype.then=t.prototype.c,window.Promise.prototype["catch"]=t.prototype.g)}(),function(){function n(n,e){document.addEventListener?n.addEventListener("scroll",e,!1):n.attachEvent("scroll",e)}function e(n){document.body?n():document.addEventListener?document.addEventListener("DOMContentLoaded",function e(){document.removeEventListener("DOMContentLoaded",e),n()}):document.attachEvent("onreadystatechange",function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),n())})}function t(n){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(n)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function o(n,e){n.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+e+";"}function i(n){var e=n.a.offsetWidth,t=e+100;return n.f.style.width=t+"px",n.c.scrollLeft=t,n.b.scrollLeft=n.b.scrollWidth+100,n.g!==e?(n.g=e,!0):!1}function r(e,t){function o(){var n=r;i(n)&&n.a.parentNode&&t(n.g)}var r=e;n(e.b,o),n(e.c,o),i(e)}function a(n,e){var t=e||{};this.family=n,this.style=t.style||"normal",this.weight=t.weight||"normal",this.stretch=t.stretch||"normal"}function c(){if(null===l){var n=document.createElement("div");try{n.style.font="condensed 100px sans-serif"}catch(e){}l=""!==n.style.font}return l}function u(n,e){return[n.style,n.weight,c()?n.stretch:"","100px",e].join(" ")}var s=null,d=null,l=null,f=null;a.prototype.load=function(n,i){var a=this,c=n||"BESbswy",l=0,h=i||3e3,p=(new Date).getTime();return new Promise(function(n,i){var m;if(null===f&&(f=!!document.fonts),(m=f)&&(null===d&&(d=/OS X.*Version\/10\..*Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),m=!d),m){m=new Promise(function(n,e){function t(){(new Date).getTime()-p>=h?e():document.fonts.load(u(a,'"'+a.family+'"'),c).then(function(e){1<=e.length?n():setTimeout(t,25)},function(){e()})}t()});var w=new Promise(function(n,e){l=setTimeout(e,h)});Promise.race([w,m]).then(function(){clearTimeout(l),n(a)},function(){i(a)})}else e(function(){function e(){var e;(e=-1!=v&&-1!=g||-1!=v&&-1!=b||-1!=g&&-1!=b)&&((e=v!=g&&v!=b&&g!=b)||(null===s&&(e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),s=!!e&&(536>parseInt(e[1],10)||536===parseInt(e[1],10)&&11>=parseInt(e[2],10))),e=s&&(v==y&&g==y&&b==y||v==_&&g==_&&b==_||v==x&&g==x&&b==x)),e=!e),e&&(E.parentNode&&E.parentNode.removeChild(E),clearTimeout(l),n(a))}function d(){if((new Date).getTime()-p>=h)E.parentNode&&E.parentNode.removeChild(E),i(a);else{var n=document.hidden;!0!==n&&void 0!==n||(v=f.a.offsetWidth,g=m.a.offsetWidth,b=w.a.offsetWidth,e()),l=setTimeout(d,50)}}var f=new t(c),m=new t(c),w=new t(c),v=-1,g=-1,b=-1,y=-1,_=-1,x=-1,E=document.createElement("div");E.dir="ltr",o(f,u(a,"sans-serif")),o(m,u(a,"serif")),o(w,u(a,"monospace")),E.appendChild(f.a),E.appendChild(m.a),E.appendChild(w.a),document.body.appendChild(E),y=f.a.offsetWidth,_=m.a.offsetWidth,x=w.a.offsetWidth,d(),r(f,function(n){v=n,e()}),o(f,u(a,'"'+a.family+'",sans-serif')),r(m,function(n){g=n,e()}),o(m,u(a,'"'+a.family+'",serif')),r(w,function(n){b=n,e()}),o(w,u(a,'"'+a.family+'",monospace'))})})},"undefined"!=typeof module?module.exports=a:(window.FontFaceObserver=a,window.FontFaceObserver.prototype.load=a.prototype.load)}(),function(n,e){"undefined"!=typeof module&&module.exports?module.exports=e():"function"==typeof define&&define.amd?define(e):this[n]=e()}("$loader",function(){var n=function(n){return"[object Array]"===Object.prototype.toString.call(n)},e=function(){return/micromessenger/.test(navigator.userAgent.toLowerCase())&&window.self===window.top},t=function(){var n=!0;try{"undefined"!=typeof AudioContext?new AudioContext:"undefined"!=typeof webkitAudioContext?new webkitAudioContext:n=!1}catch(e){n=!1}return n},o=function(n){var o=this;if(o._count=0,o._total=0,o._css=n.css||[],o._js=n.js||{},o._audio=n.audio||{},o._image=n.image||[],o._html=n.html||[],o._font=n.font||[],o._commonArgs=n.commonArgs||"",o._debugger=n["debugger"],o._wxRequired=n.wxRequired||!1,o._wxConfig=n.wxConfig||{debug:/debug/.test(window.location.href),appId:"",timestamp:"",nonceStr:"",signature:"",jsApiList:[]},o._usingWebAudio=t()&&n.usingWebAudio,o._onprogress=[n.onprogress||function(){}],o._oncomplete=[n.oncomplete||function(){}],o._onpause=n.onpause||function(){},o.hackWechatAudio=e()&&(!o._usingWebAudio||/android/i.test(navigator.userAgent)),o._audio.sources&&o._audio.sources.length&&o.hackWechatAudio){for(var i=0;i<o._audio.sources.length+2;i++){var r=new Audio;r.id="track"+i,document.body.appendChild(r)}!function(){var n=0;window.AudioClass=window.Audio,window.Audio=function(){var e=document.querySelectorAll('audio[id^="track"]'),t=e[n%e.length];return t.__proto__=Audio.prototype,n++,t},Audio.prototype=new AudioClass}()}o.load()};return o.prototype={load:function(){function t(e,t){return n(t)&&(t=t.reduce(function(n,e){return n+"&"+(0===e.indexOf("&")||0===e.indexOf("?"))?e.substr(1):e},"")),"string"!=typeof t?e:(0!==t.indexOf("&")&&0!==t.indexOf("?")||(t=t.substr(1)),0===t.length?e:e.indexOf("?")>=0?e+"&"+t:e+"?"+t)}function o(n,e){var o=document.createElement("script");o.type="text/javascript",o.onload=function(){o.onload=null,e()},document.getElementsByTagName("head")[0].appendChild(o),o.src=t(n,a._commonArgs)}function i(e,t){!n(e)||c>=e.length||o(e[c],function(){"function"==typeof t&&t(e[c]),c+=1,i(e,t)})}function r(n){return window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(n):window.webkitURL?window.webkitURL.createObjectURL(n):(console.warn("Do not support create object url"),null)}var a=this;if(a._css.map(function(n){a._total+=1,onloadCSS(loadCSS(n),function(){a._cb(n)})}),a._image.forEach(function(n){a._total+=1;var e=new Image;e.addEventListener("load",function(){a._cb(n)}),e.src=n}),window.wx&&e()&&(a._wxRequired&&(a._total+=1),wx.config(a._wxConfig),wx.ready(function(){console.log("wx ready"),a._wxConfig.shareObj=a._wxConfig.shareObj||{};var n=a._wxConfig.shareObj;n.title=n.title||document.title,n.link=n.link||location.href,n.success=n.success||function(){},n.cancel=n.cancel||function(){},wx.onMenuShareTimeline(n),wx.onMenuShareAppMessage(n),wx.onMenuShareQQ(n),wx.onMenuShareWeibo(n),wx.onMenuShareQZone(n),a._wxRequired&&a._cb("wechat ready.")}),wx.error(function(n){console.error("wx.error",n.errMsg)})),a._debugger){var c=0,u=Object.keys(a._js).reduce(function(n,e){var t=a._js[e];return n.concat(t)},[]);a._total+=u.length,i(u,function(n){a._cb(n)})}else Object.keys(a._js).forEach(function(e){var t=a._js[e];n(t)&&(a._total+=t.length,$script(t,e,function(n){return function(){for(var e=0;n>e;e++)a._cb(t[e])}}(t.length)))}),$script.ready(Object.keys(a._js),function(){$script.done("complete")});var s=function(n,e){if(!n)return void a._cb(n);var t=new XMLHttpRequest;t.addEventListener("load",function(){document.getElementById(e).innerHTML=t.response,a._cb(n)}),t.addEventListener("error",function(){console.error("html load error"),a._cb(n)}),t.open("GET",n),t.responseType="text",t.send()};if(a._html.map(function(n){var e=n.split("#"),t=e.pop(),o=e.join("#");a._total+=1,a._onpause(o,function(n){s(n,t)})}),a._usingWebAudio&&a._audio.urls&&a._audio.urls.length>0){a._audio.urls.length>1&&(a._audio.urls=[a._audio.urls[1]]),a._total+=1;var d=new XMLHttpRequest;d.addEventListener("load",function(){a._audio.blobUrls=r(d.response),a._audio.format="mp3",a._cb(a._audio.blobUrls)}),d.addEventListener("error",function(){console.error("blob error"),a._cb(a._audio.urls[0])}),d.open("GET",a._audio.urls[0]),d.responseType="blob",d.send()}a._font.map(function(n){a._total+=1;var e=new FontFaceObserver(n);e.load(null,1e3).then(function(){a._cb("font ready: "+n)},function(n){a._cb("font timeout: "+n)})})},count:function(){var n=this;return n._count},total:function(){var n=this;return n._total},audio:function(){var n=this;return n._audio},_cb:function(n){var e=this;e._count+=1,e.on("progress"),console.log(e._count+" / "+e._total+": (src)"+n),e._count===e._total&&setTimeout(function(){e.on("complete")})},on:function(n,e){var t=this,o=t["_on"+n];if("function"==typeof e)o.push(e);else for(var i=0;i<o.length;i++)e?o[i].call(t,e):o[i].call(t)},off:function(n,e){var t=this,o=t["_on"+n];if(e){for(var i=0;i<o.length;i++)if(e===o[i]){o.splice(i,1);break}}else t["_on"+n]=[];return t}},o}),function(){function n(n,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(n,e.bubbles,e.cancelable,e.detail),t}return"function"==typeof window.CustomEvent?!1:(n.prototype=window.Event.prototype,void(window.CustomEvent=n))}();