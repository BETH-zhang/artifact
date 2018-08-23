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

var Constant = {
  ROLE_TYPE: {
    MC_QRCODE: 'mc-qrcode',
    MC_INPUT: 'mc-input',
    MC: 'mc',
    PERSON: 'person',
  },
  CONNECT_TYPE: {
    'M2P': 'mc-to-person',
    'M2A': 'mc-to-all-person',
    'M2S': 'mc-to-server',
    'P2M': 'person-to-mc',
    'P2P': 'person-to-person',
  },
}

var send = function(conn, text) {
  if (conn) {
    conn.sendText(text);
  }
}

var recursionAsync = function(count, data, source, callback) {
  console.log(count, peos[count])
  if (count === 0) {
    console.log('All is Done!');
  }	else {
    count -= 1;
    send(data[count], source);
    recursionAsync(count, data, source, callback);
  }
};

var demoData = {
  name: '张百鸽', // 必填
  moduleType: 'ppt',
  connectType: 'M2P',
  roleType: 'mc', // 链接成功之后不需要该字段
  from: 'mc',
  to: 'beth',
  data: {
    eventType: 'changePage',
    page: 1,
    msg: '请看第一页PPT',
  },
};

function receiveConnect(conn, source, req) {
  var newSource = JSON.stringify(Object.assign({}, req, {
    data: Object.assign({}, req.data, {
      peos,
      lives,
    })
  }));

  switch(req.roleType) {
    case Constant.ROLE_TYPE.MC_QRCODE:
      mcs[0] = req.roleType;
      mcReady[0] = conn;
      // 入口连接
    case Constant.ROLE_TYPE.MC_INPUT:
      mcs[1] = req.roleType;
      mcReady[1] = conn;
      send(mcReady[0], source)
    case Constant.ROLE_TYPE.MC:
      mcs[2] = req.roleType;
      mcReady[2] = conn;
      break;
    case Constant.ROLE_TYPE.PERSON:
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
      
      if (peoReady && peoReady.length) {
        recursionAsync(
          peoReady.length,
          peoReady,
          newSource
        )
      }
      send(mcReady[2], newSource)
      break;
    default:
      break;
  }

  send(conn, source);
}

function receiveMessage(conn, source, req) {
  var newSource = source;
  // var newSource = JSON.stringify(Object.assign({}, req, {
  //   data: Object.assign({}, req.data, {
  //     peos,
  //     lives,
  //   })
  // }));
  switch (req.connectType) {
    case Constant.CONNECT_TYPE.M2P:
      var index = peos.indexOf(req.to);
      var callConn = peoReady[index];
      send(callConn, newSource);
      break;
    case Constant.CONNECT_TYPE.M2A:
      if (peoReady && peoReady.length) {
        recursionAsync(
          peoReady.length,
          peoReady,
          newSource
        )
      }
      break;
    case Constant.CONNECT_TYPE.M2S:
      if (req.moduleType === 'other' && req.data.eventType === 'delete') {
        peos.splice(index, 1)
        peoReady.splice(index, 1)
        delete lives[data.name]
      }
      break;
    case Constant.CONNECT_TYPE.P2M:
      send(mcReady[2], newSource);
      break;
    case Constant.CONNECT_TYPE.P2P:
      send(mcReady[2], newSource);
      if (peoReady && peoReady.length) {
        recursionAsync(
          peoReady.length,
          peoReady,
          newSource
        )
      }
      break;
    default:
      break;
  }

  send(conn, newSource);
}

var server = ws.createServer(function(conn){
  console.log(conn.id, '---- id ----');
    conn.on("text", function (source) {
      console.log("收到的信息为:", source)
      var req = source ? JSON.parse(source) : {};
      if (!req.roleType && !req.connectType) {
        return null;
      }

      if (req.roleType && !req.connectType) {
        receiveConnect(conn, source, req);
      } else {
        receiveMessage(conn, source, req);
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