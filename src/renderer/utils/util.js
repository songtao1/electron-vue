let loginWin,mainWin;
import { app, BrowserWindow,ipcMain,screen} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;


// function createWindow() {
//   /**
//    * Initial window options
//    */  
//   mainWindow = new BrowserWindow({
//     height: 500,
//     useContentSize: false,
//     width: 300,
//     resizable: false,
//     center:true
//   })

//   mainWindow.loadURL(winURL)

//   mainWindow.on('closed', () => {
//     mainWindow = null
//   })
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// ipcMain.on('makeScreenWider', function() {
//     mainWindow = new BrowserWindow({
//         height: 500,
//         useContentSize: false,
//         width: 1000,
//         resizable: false,
//         center:true
//       })
    
//       mainWindow.loadURL(winURL)
    
//       mainWindow.on('closed', () => {
//         mainWindow = null
//       })
// }) 
// app.on('activate', () => {
//   if (mainWindow === null) {
//     createWindow()
//   }
// })


// export const openLoginWin = () => {
//     mainWindow = new BrowserWindow({
//             height: 500,
//             useContentSize: false,
//             width: 300,
//             resizable: false,
//             center:true
//           })
        
//           mainWindow.loadURL(winURL)
        
//           mainWindow.on('closed', () => {
//             mainWindow = null
//           })
// }