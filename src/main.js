// main.js innehåller det somm händer server side (Node) 

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')


console.log('Hello main')

const createWindow = () => {
    const win = new BrowserWindow({
        with: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true // bara gömd, kan öppnas med Alt
    })

    win.loadFile(path.join(__dirname, 'index.html'))

    // Öppna developer tools automatiskt, endast i utvecklingsskedet, förstås.
    win.webContents.openDevTools()

}

// Skapa browserfönstret när appen laddats
app.on('ready', createWindow)

// Hanterare som väntar på signal till 'btn-handler' från preload.js
ipcMain.handle('btn-handler', async (event, data) => {
    console.log("Click received in main")

    // Returnera data till preload.js
    return 'Main says hello!'
})