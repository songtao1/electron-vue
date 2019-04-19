import { app, BrowserWindow,ipcMain,screen,Menu} from 'electron'
const fs = require('fs');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// const winURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080`
//   : `file://${__dirname}/index.html`;
//读取文件，判断是否一登录
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
function getLocalData(callBack){
    try{
        fs.readFile('./user/user.txt', 'utf8', function(err, data){
            console.log(data); 
            callBack(true); 
        });
    }catch(e){
        callBack(false)
    }
}
// console.log(1111)
function openLoginWin() { 
  /**
   * Initial window options
   */ 
    getLocalData((res)=>{
        let width,height;
        if(res){    
            width = 400, height = 500;
        }else{
            width = 1000, height = 600;
        }
        Menu.setApplicationMenu(null)
        mainWindow = new BrowserWindow({
            height: height,
            useContentSize: false,
            width: width,
            resizable: false,
            center:true,
        })
    
        mainWindow.loadURL(winURL)
        //   mainWindow.webContents.openDevTools({mode:'detach'})
        mainWindow.on('closed', () => {
            mainWindow = null
        })
    })
   
}

app.on('ready', openLoginWin)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
//登录成功
ipcMain.on('login', function() {
    let winW=screen.getPrimaryDisplay().workAreaSize.width/2-500;
    let winH=screen.getPrimaryDisplay().workAreaSize.height/2-300;
    mainWindow.setBounds({ x: winW, y: winH, width: 1000, height: 600})
}) 
//退出
ipcMain.on('logout', function() {
    let winW=screen.getPrimaryDisplay().workAreaSize.width/2-200;
    let winH=screen.getPrimaryDisplay().workAreaSize.height/2-250;
    mainWindow.setBounds({ x: winW, y: winH, width: 400, height: 500})
}) 

app.on('activate', () => {
    console.log(22112)
  if (mainWindow === null) {
    openLoginWin()
  }
})

// ipcMain.on('login-window', () => {
//     mainWindow.setSize(200, 900)
//   })
// export {mainWindow}
// mainWindow.setSize(100,200);
// export const changeSize = () => {
//     mainWindow.setSize(100,200);
// }
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

















