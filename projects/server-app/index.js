var proxy = require('redbird')({
  bunyan: {
    name: 'server-app',
    level: 'warn'
  },
  port: 3000
});

var os = require('os');
var ifaces = os.networkInterfaces();

var localIp = Object.keys(ifaces)
  .map((ifname) => ifaces[ifname]
    .map(iface => ('IPv4' !== iface.family || iface.internal !== false) ? null : iface.address)
    .filter(Boolean)[0])
  .filter(Boolean)[0];

proxy.register(`${localIp}:3000`, "localhost:3002");
proxy.register(`${localIp}:3000/api`, "localhost:3001/api");
proxy.register(`${localIp}:3000/socket.io`, "localhost:3001/socket.io");
proxy.register(`ws://${localIp}:3000`, "ws://localhost:3001");

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

  mainWindow.loadURL(`http://${localIp}:3000`);
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
