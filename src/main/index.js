import { app, BrowserWindow, ipcMain, screen } from 'electron'
import windowManage from "./winManage"
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/index.html#`
  : `file://${__dirname}/index.html/#`

let globalWindowList = {}

function createWindow() {
  /**
   * Initial window options
   */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const windowList = [];

  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true // add this
    }
  })

  mainWindow.loadURL(winURL)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 对于 OS X 系统，当 dock 图标被点击后会重新创建一个 app 窗口，并且不会有其他窗口打开
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 渲染进程会发送'create-new-window'以创建新的窗口
ipcMain.on('create-new-window', (event, windowInfo) => {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize
  let config = {
    useContentSize: true,
    backgroundColor: '#fff',
    frame: false,
    webPreferences: {
      webSecurity: false,
      defaultFontFamily: { sansSerif: 'Microsoft YaHei' },
      backgroundThrottling: false,
    },
    width: 800,
    height: 600,
    show: false,
    name: windowInfo.name,
    url: windowInfo.url,
    data:windowInfo.data
  }
  windowManage.createWindow(config);
})

ipcMain.on('close', (evt, winName = null) => {
  if (winName) {
    windowManage.closeWindow(winName);
  } else {
    windowManage.closeWindow(evt.sender.browserWindowOptions.name);
  }
})

// 接收渲染进程发送的异步消息
ipcMain.on("sendMsg",(event,data) =>{
  console.log('event\n ', event);
  console.log('data\n ', data);
  // 接收到渲染进程发送的消息并广播通知渲染进程
  event.sender.send('sendFeedbackToRender', '我是回复的异步消息')
})

// 接收渲染进程发送的同步消息
ipcMain.on("sendSyncMsg",(event,data) =>{
  console.log('event\n ', event);
  console.log('data\n ', data);
  event.returnValue = {
    data,
    msg:"我是主进程，反馈渲染进程发送的同步消息"
  }
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
