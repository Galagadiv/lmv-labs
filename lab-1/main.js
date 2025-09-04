const { app, BrowserWindow, ipcMain } = require('electron');

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#000000', // чорний фон
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(__dirname + '/index.html');
  win.hide(); // спочатку прихований
});

// ховаємо / показуємо екран
ipcMain.on("hide-screensaver", () => {
  if (win && !win.isDestroyed()) win.hide();
});

ipcMain.on("show-screensaver", () => {
  if (win && !win.isDestroyed()) win.show();
});
