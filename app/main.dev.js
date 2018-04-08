/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain, dialog, clipboard } from 'electron'
import CryptoJS from 'crypto-js'
import bip39 from 'bip39'
import pqccore from 'pqc-core'
import fs from 'fs'
import MenuBuilder from './menu'
import { getWalletPath } from './utils/storage'

const { Keypair } = pqccore

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('save-wallet', (event, data) => {
  console.log(88, data)
  const { seed, password, network } = data
  const buffer = bip39.mnemonicToSeed(seed)
  const seedString = buffer.toString('hex')
  const bytes = CryptoJS.AES.encrypt(seedString, password)
  const obj = {
    seed: bytes.toString(), // base64 encoded
    encrypted: true
  }
  const keypair = new Keypair({
    secret: buffer,
    network
  })
  const name = `wallet_${keypair.toAddress()}.pqc`
  const defaultPath = `${getWalletPath()}/${name}`
  const realPath = dialog.showSaveDialog(mainWindow, {
    defaultPath,
    filters: [
      { name: 'Wallet File', extensions: ['pqc'] }
    ]
  })
  if (realPath) {
    // write to that path
    if(fs.writeFileSync(realPath, JSON.stringify(obj))) {
      event.sender.send('save-wallet-result')
    } else {
      event.sender.send('save-wallet-result', new Error('fail to save wallet'))
    }
  }
})

ipcMain.on('copy-clipboard', (event, data) => {
  clipboard.writeText(data)
  event.sender.send('copy-clipboard-result', '')
})
