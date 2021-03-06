## Artifact
> Artifact 是一款MC的直播工具，主要提供每周事业部分享的互动专区,同时收集新同事入职，部门汇报，个人分享等

### 截屏（Screenshots）
![Screenshots](./main.png)

### 功能点 (Feature)
* 本周MC进入/mc.html 通过扫码进入MC主界面
* 参加者可以通过MC分享的二维码扫码进入
* 参加者可以通过输入不同的角色，进入参加者界面
* MC主界面可以实时看到参加者加入的人和状态
* MC主界面可以自定义切换音乐（TODO）
* MC主界面可以控制会议进度
* 参加者界面可以实时看到界面状态
* 可以点对点实时沟通（TODO）
* 可以点对面实时沟通（TODO）

### 设计开发流程 
 * 小需求整理（整理为什么要做它，它的定位）
 * 根据需求，设计交互流程图
 * 根据交互流程图，设计图
 * 进入代码开发阶段
 * 对功能进行回溯测试
 * 针对下一个阶段进行规划

## 端对端
* 服务端 --- 提供统一的消息转发服务
* MC主界面端 --- 提供生成当前MC的二维码，参会人加入后，都会看到当前MC的个人信息 --- 可以对当前MC进行点评
* 参会人界面端 --- 根据MC提供的二维码扫描进入，能够看到当前参会人的状态，以及分享的状态

## 开发流程
* 确定人员身份、角色、以及不同角色的职责
* 对数据进行log打印分析
* 找UI图进行替换
* 模拟使用流程进行演练

## 遇到的问题
* 对于多端的用户连接
* 原生实现一个本次存储
* 服务端如果断了，需要redis或者本地文件存储之前的信息，然后重连
 
### Example

### API

### 未来扩展

* 加入直播视频
* 加入直播画板
* 加入视频美颜

