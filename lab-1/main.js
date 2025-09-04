const { app, BrowserWindow, powerMonitor } = require('electron');
const path = require('path');

const IDLE_THRESHOLD_SEC = 5; 
const POLL_MS = 500;           

let win;
let intervalId;

function createWindow() {
  win = new BrowserWindow({
    show: false,              
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#000000',
    skipTaskbar: true,
    focusable: false,        
    transparent: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setIgnoreMouseEvents(true, { forward: true }); 

  win.loadFile(path.join(__dirname, 'index.html'));

  intervalId = setInterval(() => {
    const idleSec = powerMonitor.getSystemIdleTime(); 
    if (idleSec >= IDLE_THRESHOLD_SEC) {
      if (!win.isVisible() && !win.isDestroyed()) win.showInactive();
    } else {
      if (win.isVisible() && !win.isDestroyed()) win.hide();
    }
  }, POLL_MS);

  powerMonitor.on('resume', () => win.hide());
  powerMonitor.on('unlock-screen', () => win.hide());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (intervalId) clearInterval(intervalId);
  app.quit();
});
