/**
 *  preload.js sköter kommunikationen mellan browsern och node, alltså mellan renderer.js och main.js
 * ipc = Inter Process Communication, alltså ipc betyder kommunikation mellan serverporcessen (main.js) och klientprocessen (broesern, renderer.js)
 *
 * Idén med preload.js är att vi kan välja vad vi visar åt front-end i stället för att göra hela back-end processen tillgänglig. 
 */

const { ipcRenderer, contextBridge } = require('electron');

// exposeInMainWorld innehåller allt det som vi vill att klienten ska kunna komma åt
contextBridge.exposeInMainWorld('electron', {

    btnClicked: async (data) => {
        console.log('click received in preload.js')

        // ipcRenderer.invoke() triggar hanteraren 'btn-handler' i main.js, skickar med data bvid behov
        // returnerar svaret från btn-handler 
        return await ipcRenderer.invoke('btn-handler', data)
    }

})


