const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({
    width: 900, height: 600,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  win.loadFile('index.html');
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();

});

const { ipcMain } = require('electron');
const fs = require('fs/promises');

ipcMain.handle('list-dir', async (event, dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = entries.map(file => ({
    name: file.name,
    isDirectory: file.isDirectory()
}));

return result;
});