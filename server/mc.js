var ws = require("nodejs-websocket");
console.log("MC服务开始建立连接...")

var mcs = new Array(2);
var mcReady = new Array(2);
var peos = [];
var peoReady = [];
var lives = {
  翟少成: {
    role: 'option3',
    title: '事业部前端分享',
  },
};

var send = function(conn, text) {
  if (conn) {
    conn.sendText(text);
  }
}

var sendTypeForPeo = function(data, callback) {
  if (!data.name || !data.type) {
    return;
  }
  var index = peos.indexOf(data.name);
  console.log('~~~data', data)
  switch(data.type) {
    case 'call':
      break;
    case 'delete':
      peos.splice(index, 1)
      peoReady.splice(index, 1)
      delete lives[data.name]
      break;
    case 'message':
      break;
    default:
      break;
  }

  if (callback) {
    callback();
  }
}

var server = ws.createServer(function(conn){
    conn.on("text", function (source) {
        console.log("收到的信息为:", source)
        var req = JSON.parse(source);

        // 初始化链接
        if (req.roleType < 3) {
          mcs[req.roleType] = req.roleType;
          mcReady[req.roleType] = conn;
        }else if (req.roleType === 3) {
          if (req.data.name) {
            var index = peos.indexOf(req.data.name);
            if (peos.indexOf(req.data.name) === -1) {
              peos.push(req.data.name);
              peoReady.push(conn);
            } else {
              peos[index] = req.data.name;
              peoReady[index] = conn;
            }
            if (req.data.role) {
              lives[req.data.name] = req.data;
            }
          }
        }

        console.log('-------roles------', mcs)
        console.log('*******peos*******', peos)

        // 处理MC进入主界面的逻辑
        if (req.roleType === 1) {
          // 入口连接
          send(mcReady[0], source)
          // mc输入名字连接
          send(mcReady[1], source)
        } else if (req.roleType === 2) {
          if (req.data.type) {
            sendTypeForPeo(req.data, function() {
              send(mcReady[2], JSON.stringify({
                roleType: req.roleType,
                data: Object.assign({}, req.data, {
                  peos,
                  lives,
                }),
              }))
            })
          } else {
            send(mcReady[2], source)
          }
        } else if (req.roleType === 3) {
          send(conn, source)
          if (req.data.name) {
            send(mcReady[2], JSON.stringify({
              roleType: 3,
              data: {
                enter: true,
                currentPeo: req.data.name,
                peos,
                lives,
              },
            }))
          }
        } else {
          // 所有数据都会返回过去
          send(conn, source)
        } 
    })

    conn.on("close", function (code, reason) {
      console.log("服务关闭连接", code, reason)
    });

    conn.on("error", function (code, reason) {
      console.log("服务异常关闭")
    });
}).listen(8001)
console.log("WebSocket建立完毕")