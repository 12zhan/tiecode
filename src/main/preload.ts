import { contextBridge, ipcRenderer } from 'electron';
import fs from 'fs'

/**
 * 暴露基础无危害文件操作
 */
contextBridge.exposeInMainWorld('fileApi', {
  readFile(path: string) {
    fs.readFileSync(path, 'utf-8')
  },
})

contextBridge.exposeInMainWorld('electronAPI', {
  require(path:string){
    return require(path);
  },
  devtools(){
    ipcRenderer.send('devtools')
  },
  top(){
    ipcRenderer.send('windows:top')
  },max(){
    ipcRenderer.send('windows:max')
  },
  min(){
    ipcRenderer.send('windows:min')
  },
  close(){
    ipcRenderer.send('windows:close')
  }
})
