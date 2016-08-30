const {app, BrowserWindow, ipcMain, Menu, shell} = require('electron')

const env = process.env.NODE_ENV

let win

ipcMain.on('ready', () => {

})

function createWindow () {
  win = new BrowserWindow({ width: 400 })
  win.loadURL(`file://${__dirname}/app/index.html`)
  if (env === 'development') {
    win.webContents.openDevTools({
      mode: 'detach'
    })
  }
  win.on('closed', () => { win = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (!win) createWindow()
})
