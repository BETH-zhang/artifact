# 美小神策对接

> 对接项目 smart、admin、教师端

参考文档：
[http://confluence.smartstudy.com/pages/viewpage.action?pageId=29000551](http://confluence.smartstudy.com/pages/viewpage.action?pageId=29000551)
[https://www.sensorsdata.cn/manual/js_sdk.html](https://www.sensorsdata.cn/manual/js_sdk.html)

数据查看：

[http://sa.smartstudy.com/](http://sa.smartstudy.com/)

SDK初始化：

[https://www.sensorsdata.cn/tools/code_auto/?data=%7B%22http_config_url%22%3A%22http%3A%2F%2Fsea.smartstudy.com%2Fconfig%2F%22%2C%22https_config_url%22%3A%22https%3A%2F%2Fsea.smartstudy.com%2Fconfig%2F%22%2C%22http_data_url%22%3A%22http%3A%2F%2Fsea.smartstudy.com%2F%22%2C%22http_web_url%22%3A%22http%3A%2F%2Fsa.smartstudy.com%2F%22%2C%22project%22%3A%22default%22%2C%22https_data_url%22%3A%22https%3A%2F%2Fsea.smartstudy.com%2F%22%2C%22code_type%22%3A%22web%22%7D](https://www.sensorsdata.cn/tools/code_auto/?data=%7B%22http_config_url%22%3A%22http%3A%2F%2Fsea.smartstudy.com%2Fconfig%2F%22%2C%22https_config_url%22%3A%22https%3A%2F%2Fsea.smartstudy.com%2Fconfig%2F%22%2C%22http_data_url%22%3A%22http%3A%2F%2Fsea.smartstudy.com%2F%22%2C%22http_web_url%22%3A%22http%3A%2F%2Fsa.smartstudy.com%2F%22%2C%22project%22%3A%22default%22%2C%22https_data_url%22%3A%22https%3A%2F%2Fsea.smartstudy.com%2F%22%2C%22code_type%22%3A%22web%22%7D)


```js

<script type='text/javascript'>
    // 神策嵌入的代码
    window.saUserId = undefined;
    let server_url = !window.isProduction ? '//sea.smartstudy.com/sa' : '//sea.smartstudy.com/sa?project=production';
    (function(para) {
      var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
      w['sensorsDataAnalytic201505'] = n;
      w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
      var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
      for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
      }
      if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        x.setAttribute('charset','UTF-8');
        y.parentNode.insertBefore(x, y);
        w[n].para = para;
      }
    })({
      sdk_url: '//media8.smartstudy.com/data/sa/1.10.6/sensorsdata.min.js',
      heatmap_url: '//media8.smartstudy.com/data/sa/1.10.6/heatmap.min.js',
      name: 'sa',
      web_url: '//sa.smartstudy.com/',
      server_url,
      use_app_track: true,
      heatmap:{}
    });
    sa.clearAllRegister();

    (function() {
      var getCookieEarlier = (key, prefix) => {
        const newKey = !prefix ? key : prefix + key;
        if (typeof document !== 'undefined') {
          const pairs = document.cookie.split(';').map(pair => (
            {
              key: pair.split('=')[0],
              value: pair.split('=')[1],
            }
          ));

          for (let i = 0; i < pairs.length; i += 1) {
            if (pairs[i].key.trim() === newKey) {
              return decodeURIComponent(pairs[i].value);
            }
          }
        }
        return undefined;
      };

      sa.registerSmart = function() {
        var userId = getCookieEarlier('originUserId', 'apol_') || undefined;
        if (userId) {
          sa.login(userId)
        } else {
          sa.logout(true)
        }
        window.saUserId = userId

        var cpsInfo = getCookieEarlier('cpsInfo'); // 获取包含渠道pid的对象
        var cpsInfoObject
        try {
          cpsInfoObject = JSON.parse(cpsInfo)
        } catch (error) {
          // do nothing
        }
        var userTypeId = getCookieEarlier('userTypeId', 'apol_');
        var userType = userTypeId ? userTypeId === '1' ? '学生' : '教师' : '';
        var organizationName = getCookieEarlier('organizationName', 'apol_') || '';
        // 判断是否是移动端
        var mobileAndTabletcheck = function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        };
        // 每次调用就会覆盖一下要发送的这些公共属性
        sa.register({
          platform: !mobileAndTabletcheck() ? 'PC' : 'H5',
          product: 'Smart',
          userType,
          pid: cpsInfoObject ? cpsInfoObject.pid : '',
          is_login: userId ? true : false,
          organization_name: organizationName,
        });
      }
      sa.registerSmart()
    })()

    sa.quick('autoTrack');
</script>

```

### 对页面切换进行数据打点
```js
componentDidUpdate (prevProps, prevState) {
    const oldPathName = prevProps.location.pathname
    const oldSearch = prevProps.location.search
    const { pathname, search } = this.props.location
    if (oldPathName !== pathname || oldSearch !== search) {
      if (window.sa) {
        window.sa.quick('autoTrackSinglePage')
      }
    }
  }
```
路由变了要手动再触发一下，这段在我们项目总的container中

### 定义公共方法类
```js
'use strict'

module.exports = class SensorHelper {
  trackSensor (sensorName, data) {
    if (window.sa) {
      window.sa.track(sensorName, data)
    }
  }

  trackStudyTaskSensor (item) {
    // 统一处理线下/在线学生端学员开始一个status为1的任务的时候，要发送一个神策事件
    const exerciseType = constants.TASK_TYPES_CHN[item.type || 'unknown']
    const data = {
      page_title: item.name,
      page_url: location.href,
      exercise_id: item.id,
      exercise_type: exerciseType
    }
    this.trackSensor('start_study_task', data)
  }

  trackVideoSensor (props, type, endTime) {
    let sensorName = ''
    const data = {
      page_title: props.slice.name || '',
      page_url: location.href,
      slice_id: +props.slice.id,
      slice_name: props.slice.name || '',
      url: props.organization.name,
      slice_length: props.slice.duration || 0,
      is_already_finished: props.slice.complete || false
    }
    if (type === 'open') {
      data.start_time = props.slice.time || 0
      sensorName = 'start_watch_course'
    } else {
      // 通过播放器获取到的时间是小数，向下取整一下
      data.end_time = Math.floor(endTime) || 0
      sensorName = 'finish_watch_course'
    }
    this.trackSensor(sensorName, data)
  }
}
```

有这样的helper，发生了神策规定的自定义事件就这样发送数据

### 注册
```js
sa.register({
  platform: !mobileAndTabletcheck() ? 'PC' : 'H5',
  product: 'Smart',
  userType,
  pid: cpsInfoObject ? cpsInfoObject.pid : '',
  is_login: userId ? true : false,
  organization_name: organizationName,
});
```

这些注册的公共属性，每次神策事件发生都会发送。

