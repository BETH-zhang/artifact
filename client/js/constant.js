var constant = 'Constant';
window[constant] = {
  classNames: [
    'border-primary',
    'border-secondary',
    'border-success',
    'border-danger',
    'border-warning',
    'border-info',
    'border-dark',
    'border-main',
  ],
  liveBgs: [
    '../images/live1.jpeg',
    '../images/live2.jpeg',
    '../images/live3.jpeg',
    '../images/live4.jpeg',
  ],
  liveIndexs: [
    '../images/index1.png',
    '../images/index2.png',
    '../images/index3.png',
    '../images/index4.png',
    '../images/index5.png',
    '../images/index6.png',
    '../images/index7.png',
    '../images/index8.png',
    '../images/index9.png'
  ],
  ROLE_TYPE: {
    MC_QRCODE: 'mc-qrcode',
    MC_INPUT: 'mc-input',
    MC: 'mc',
    PERSON: 'person',
  },
  ROLE_STATUS: {
    'option0': '我是游客',
    'option1': '我是新人',
    'option2': '工作汇报',
    'option3': '我要分享',
  },
  CONNECT_TYPE: {
    'M2P': 'mc-to-person',
    'M2A': 'mc-to-all-person',
    'M2S': 'mc-to-server',
    'P2M': 'person-to-mc',
    'P2P': 'person-to-person',
  },
  MODULE_TYPE: {
    'PPT': 'ppt',
    'MESSAGE': 'message',
    'MEDIA': 'media',
    'CANVAS': 'canvas',
    'OTHER': 'other',
  },
  PPT_EVENT_TYPE: {
  },
  OTHER_EVENT_TYPE: {},
  MESSAGE_EVENT_TYPE: {
    'CONNECT_SUCCESS': 'connect_success',
    'CONNECT_ERROR': 'connect_error',
    'CONNECT_FIRST': 'connect_first',
    'CONNECT_REPEAT': 'connect_repeat',
    'CONNECT': 'connect',
  },
};