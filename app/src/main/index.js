'use strict'

import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
import es from 'electron-storage'
import menubar from 'menubar'
const path = require('path')
let mainWindow
let mb
let hasNew = false;
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:${require('../../../config').port}` :
  `file://${__dirname}/index.html`

es.get("notes", (err, data) => {
  if (err) {
    es.set("notes", {
      created: Date.now(),
      notes: []
    })
  } else {
    console.log(data);
  }
});



if (process.env.NODE_ENV === 'development') {

  mb = menubar({
      icon: path.join(__dirname + '/iconTemplates.png'),
      showDockIcon: true,
      dir: path.join(__dirname + "/../renderer/tray"),
      width: 400
    })
  
  console.log("dev")

} else {
  console.log("build")
  mb = menubar({
    icon: path.join(__dirname + '/iconTemplates.png'),
    showDockIcon: true,
    dir: path.join(__dirname + "/tray"),
    width: 400
  });

}

mb.on("after-create-window", function () {
  mb.showWindow()
  console.log(__dirname)
})



function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width:460,
    height:600,
    minHeight: 600,
    minWidth: 460,
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')

}

app.on('ready', function () {
  console.log(__dirname)

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
  if (hasNew){
    createWindow()
    hasNew = false
  }
})

ipcMain.on('closeTray', (event) => {
  mb.hideWindow()
})

ipcMain.on('updateNotes', (event) =>{
  hasNew = true;
})

