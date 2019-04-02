const electron = require('electron')
const path = require('path')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

const isDevMode = process.mainModule.filename.indexOf('app.asar') === -1

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false, // è ancora valido nelle nuove versioni??
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    isDevMode
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  if (isDevMode) {
    mainWindow.webContents.openDevTools()
  }
})

ipcMain.on('action:go', (event, items) => {
  console.log('Got items on ipcMain action:go channel', items)
  const newItems = [...items, { id: 4, name: 'frank' }]
  setTimeout(() => {
    console.log(
      'Sending new items on mainWindow.webContents items:update channel',
      newItems
    )
    mainWindow.webContents.send('items:update', newItems)
  }, 2000)
})
