import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  }
})

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,          // 返回Node.js版本号
  chrome: () => process.versions.chrome,      // 返回Chrome版本号
  electron: () => process.versions.electron   // 返回Electron版本号
})

import fs from 'fs'
contextBridge.exposeInMainWorld('file', {
  readFile(path: string) {
    return fs.readFileSync(path).toString()
  },
  writeFile(path: string, content: string) {
    fs.writeFileSync(path, content)
  },
  mkdir(path: string) {
    fs.mkdirSync(path)
  },
  exists(path: string) {
    return fs.existsSync(path)
  },
  unlink(path: string) {
    fs.unlinkSync(path)
  },
  rmdir(path: string, isTraversal: boolean) {
    if (isTraversal) {
      fs.rmSync(path, { recursive: true, force: true });
    } else {
      // 如果isTraversal为false，只删除空目录
      fs.rmdirSync(path);
    }
  },
  readDir(path: string) {
    return fs.readdirSync(path)
  },
  copyFile(src: string, dest: string) {
    fs.copyFileSync(src, dest)
  },
  moveFile(src: string, dest: string) {
    fs.renameSync(src, dest)
  },
  isFile(path: string) {
    return fs.statSync(path).isFile()
  }
})



import { spawn } from 'child_process'
contextBridge.exposeInMainWorld('system', {
  exec(cmd: string) {
    return new Promise((resolve, reject) => {
      const [command, ...args] = cmd.split(' ').map(arg => arg.trim());
      const childProcess = spawn(command, args);

      let stdoutData = '';
      let stderrData = '';

      childProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      childProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      childProcess.on('error', (err) => {
        reject(`Failed to start child process. ${err}`);
      });

      childProcess.on('close', (code) => {
        if (code === 0) {
          resolve({
            stdout: stdoutData,
            stderr: stderrData,
            code: code
          });
        } else {
          reject({
            stdout: stdoutData,
            stderr: stderrData,
            code: code
          });
        }
      });
    });
  }
})


import path from 'path'
import { ProjectItem } from '../src/types/ProjectItem'
import { FileTreeItemProps } from '../src/types/FileTreeItemProps'

contextBridge.exposeInMainWorld('path', path)


//暴露插件化
contextBridge.exposeInMainWorld('plugin', {
  loadPlugin(component: string) {
    const config = JSON.parse(fs.readFileSync("C:/Users/Administrator/Desktop/tiecode/插件/monaco-pulgin/PuglinReg.json").toString())
    const plugin = require(path.join("C:/Users/Administrator/Desktop/tiecode/插件/monaco-pulgin", config["regModules"][component]))
    return plugin
  }
})

contextBridge.exposeInMainWorld('project', {
  getALlProject() {
    const p = path.join('./', 'openProjects.json')
    !fs.existsSync(p) && fs.writeFileSync(p, JSON.stringify([]))
    return JSON.parse(fs.readFileSync(p).toString()) as ProjectItem[]
  },
  addProject(project: ProjectItem) {
    const p = path.join('./', 'openProjects.json')
    const projects = this.getALlProject() as ProjectItem[]
    const existingProject = projects.find(p => p.ProjectPath === project.ProjectPath && p.projectName === project.projectName && p.ProjectPackage === project.ProjectPackage);

    if (!existingProject) {
      projects.push(project);
      fs.writeFileSync(p, JSON.stringify(projects));
    }else{
      console.warn("项目已被打开过了")
    }
  },
  getFileList(p:string){
    const r : Array<FileTreeItemProps> = []
    fs.readdirSync(path.join(p)).map(file=>{
      r.push({
        name: file,
        type: fs.statSync(path.join(p,file)).isFile() ? 'file' : 'folder',
        path: path.join(p,file),
      } as FileTreeItemProps)
    })
    return r
  },
  readFile(p:string){
    return fs.readFileSync(path.join(p)).toString()
  }
})