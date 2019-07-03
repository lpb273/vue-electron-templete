import { app, BrowserWindow } from 'electron'

const globalWindowList = {};

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/index.html#`
  : `file://${__dirname}/index.html/#`

// 创建窗口,公共方法
function createWindow(config) {
  let win = new BrowserWindow(Object.assign(config, { show: false }));

  // 加载对应页面
  win.loadURL(winURL + config.url);

  // 打开调试窗口
  win.webContents.openDevTools();

  // push到globalWindowList对象
  globalWindowList[config.name] = win;

  //获取当前窗口的ID
  const winId = BrowserWindow.getFocusedWindow().id;

  win.webContents.on('did-finish-load', (event) => {
    console.log('did-finish-load');
    win.webContents.send('toRenderNews',config,winId);
  })

  win.once('ready-to-show', () => {
    console.log('ready-to-show');
    win.show();
  })

  win.on('close', () => {
    console.log('close');
    console.log(globalWindowList);
  })

  win.on('closed', () => {
    console.log('closed');
    delete globalWindowList[config.name];
    win = null;
    console.log(globalWindowList);
  })
}

// 关闭窗口
function closeWindow(winName) {
  if (globalWindowList[winName]) {
    globalWindowList[winName].close();
    globalWindowList[winName] = null;
  }
}

// 根据窗口名称获取制定窗口
function getWindowByName(winName) {
  if (globalWindowList[winName]) {
    return globalWindowList[winName];
  }
}

// 创建初始窗口
function createInitWindow() {
  let config = {
    width: 800,
    height: 600,
    useContentSize: true,
    show: false,
    name: "initWindow",
    url: "/",
    webPreferences: {
      webSecurity: false,
      defaultFontFamily: { sansSerif: 'Microsoft YaHei' },
      backgroundThrottling: false,
    }
  }
  createWindow({
    url: winURL + config.url,
    config: config,
  })
}

export default {
  createWindow,
  closeWindow,
  getWindowByName,
  createInitWindow
}