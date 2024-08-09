import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import fs from 'fs';

process.env.APP_ROOT = join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT, 'public') : RENDERER_DIST


let mainWindow: BrowserWindow

function createWindow() {


  mainWindow = new BrowserWindow({
    icon: join(process.env.VITE_PUBLIC as any,'icon.ico'),
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

/**
 * 启动DevTools
 */
ipcMain.on('devtools', (event) => {
  if (mainWindow.webContents.isDevToolsOpened()) {
    mainWindow.webContents.closeDevTools();
  }else{
    mainWindow.webContents.openDevTools();
  }
})

ipcMain.on('windows:top', (event) => {
  mainWindow.setAlwaysOnTop(mainWindow.isAlwaysOnTop() ? false : true);
})

ipcMain.on('windows:close', (event) => {
  mainWindow.close();
})

ipcMain.on('windows:max', (event) => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
})

ipcMain.on('windows:min', (event) => {
  mainWindow.minimize();
})

