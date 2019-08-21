var proxy = require('redbird')({
  bunyan: {
    name: 'server-app',
    level: 'warn'
  },
  port: 80
});

proxy.register("localhost", "localhost:3000");
proxy.register("localhost/socket.io", "localhost:3001/socket.io");
proxy.register("ws://localhost", "ws://localhost:3001");

const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('http://localhost');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

function initWindow() {
  setTimeout(createWindow, 3000);
}

app.on('ready', initWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
