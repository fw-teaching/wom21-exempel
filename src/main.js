// main.js innehåller det somm händer server side (Node) 

require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default


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
    // win.webContents.openDevTools()

}
// Skapa browserfönstret när appen laddats
app.on('ready', createWindow)

// Hanterare som väntar på signal till 'btn-handler' från preload.js
ipcMain.handle('btn-handler', async (event, data) => {
    console.log("Click received in main")

    // Returnera data till preload.js
    return 'Main says hello!'
})

ipcMain.handle('get-notes-handler', async (evet, data) => {
    console.log("get-notes-handler main")

    try {
        const response = await fetch('https://wom21-notes.azurewebsites.net/notes', {
            headers: {'Authorization': 'Bearer ' + process.env.NOTES_TOKEN },
            timeout: 2000
        })
    
        notes = await response.json() 
        return notes

    } catch (error) {
        console.log(error.message)
        return error.message
    }

})

