# demo

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

## 说明
1. 使用vue-electron脚手架
2. 安装sass，element-ui
3. 集中管理进程文件winManage.js
4. 渲染进程同步传参到主进程，并响应主进程反馈
```
event.sender.send
```
5. 渲染进程异步传参到主进程，并相应主进程反馈
```
event.returnValue
```
6. 渲染进程之间通过主进程传参

```
  win.webContents.on('did-finish-load', (event) => {
    console.log('did-finish-load');
    win.webContents.send('toRenderNews',config,winId);
  })
```
