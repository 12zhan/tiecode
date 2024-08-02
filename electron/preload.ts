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

contextBridge.exposeInMainWorld('path', path)

contextBridge.exposeInMainWorld('p', {
  parseGitLogP() {
    // const a = require(path.join("C:/Users/Administrator/Desktop/Language/nodejs", "./zzbds.js"));
    // console.log(a.parseGitLogP(`commit 4340cc89a2998684ba072a0fb7d20e5b5739f78c
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     部分文件树效果
    
    //  package.json                                       |   3 +-
    //  public/FileTypeIcon/default_folder.svg             |   1 +
    //  public/FileTypeIcon/default_folder_opened.svg      |   1 +
    //  public/FileTypeIcon/file_type_typescript.svg       |   1 +
    //  src/components/FileTree.tsx                        | 130 +++++++++++++++++++++
    //  src/components/edit/index.tsx                      |  25 +++-
    //  src/components/edit/language/tiecode/Completion.ts |  11 +-
    //  src/components/edit/language/tiecode/Highlight.ts  |   3 +-
    //  src/components/edit/language/tiecode/index.ts      |   5 +-
    //  src/page/edit/index.tsx                            |  54 +++++++++
    //  10 files changed, 222 insertions(+), 12 deletions(-)
    
    // commit 698e65cb997fb954372507ff1244a0fbb81e6b62
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     修复了莫名其妙的bug
    
    //  src/components/edit/index.tsx |  6 +--
    //  src/page/edit/index.tsx       | 89 +++++++++++++++++++++----------------------
    //  2 files changed, 45 insertions(+), 50 deletions(-)
    
    // commit 48b06a8932144c393a5cab5f17211f2c8f3e56c8
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     中文部分
    
    //  electron/main.ts                                   |    2 +-
    //  package.json                                       |    5 +-
    //  pnpm-lock.yaml                                     | 1670 +++++++++++++++++++-
    //  src/components/edit/index.tsx                      |   17 +-
    //  src/components/edit/language/tiecode/Completion.ts |   41 +
    //  src/components/edit/language/tiecode/Error.ts      |   27 +
    //  src/components/edit/language/tiecode/Highlight.ts  |   26 +
    //  .../edit/language/tiecode/InlineCompletion.ts      |   30 +
    //  src/components/edit/language/tiecode/index.ts      |   20 +
    //  src/components/edit/language/tiecode/tie.ts        |   32 +
    //  src/page/edit/index.tsx                            |   84 +-
    //  11 files changed, 1868 insertions(+), 86 deletions(-)
    
    // commit 019f9f4e0be18a64e42c18703c62465443904201
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     夜间模式
    
    //  README.md                     |   1 +
    //  assets/3.png                  | Bin 0 -> 94908 bytes
    //  electron/main.ts              |   3 ++-
    //  pnpm-lock.yaml                |  37 +++++++++++++++++++++++++++++++++++++
    //  src/components/edit/index.tsx |  14 +++++++-------
    //  src/page/edit/index.tsx       |   2 +-
    //  6 files changed, 48 insertions(+), 9 deletions(-)
    
    // commit ea25b4077a277e2907b6cae072970182ce2d844c
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     编辑部分完成
    
    //  README.md                   |   3 ++-
    //  assets/{image.png => 1.png} | Bin
    //  assets/2.png                | Bin 0 -> 128945 bytes
    //  3 files changed, 2 insertions(+), 1 deletion(-)
    
    // commit a7f033ee7ee816c620906007c6c4bb7cd88282c4
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     部分编辑部分
    
    //  package.json                             |   1 +
    //  public/git.svg                           |   1 +
    //  src/components/edit/index.tsx            |  19 ++
    //  src/components/edit/theme/GitHubDark.ts  | 348 +++++++++++++++++++++++++++++++
    //  src/components/edit/theme/GitHubLight.ts | 348 +++++++++++++++++++++++++++++++
    //  src/page/edit/index.tsx                  |  48 +++++
    //  src/page/index/WaterFall.tsx             |   5 +-
    //  src/page/index/index.tsx                 |   2 +-
    //  src/router/index.tsx                     |   6 +
    //  9 files changed, 776 insertions(+), 2 deletions(-)
    
    // commit e8701c10854183fff713e7c421c8bfdbf8b2ea8d
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     主页部分UI
    
    //  README.md                       |   1 +
    //  assets/image.png                | Bin 0 -> 49535 bytes
    //  electron/main.ts                |  11 ++++--
    //  image-1.png                     | Bin 0 -> 49535 bytes
    //  image.png                       | Bin 0 -> 49535 bytes
    //  index.html                      |  30 +++++++++------
    //  public/ProjectType/console.svg  |   1 +
    //  public/ProjectType/java.svg     |   1 +
    //  public/ProjectType/plugin.svg   |   1 +
    //  public/icon.svg                 |  56 +++++++++++++++++++++++++++
    //  src/App.css                     |  49 +++++++-----------------
    //  src/App.tsx                     |   6 +--
    //  src/Contexts/index.tsx          |   2 +-
    //  src/components/mdui/icon.tsx    |   9 +++++
    //  src/index.css                   |  68 --------------------------------
    //  src/main.tsx                    |   1 -
    //  src/page/index/CreateDialog.tsx |  43 +++++++++++++++++++++
    //  src/page/index/ThemeSwitch.tsx  |  27 +++++++++++++
    //  src/page/index/WaterFall.tsx    |  83 ++++++++++++++++++++++++++++++++++++++++
    //  src/page/index/index.tsx        |  44 +++++++++++++++------
    //  src/utils/random.ts             |   5 +++
    //  21 files changed, 303 insertions(+), 135 deletions(-)
    
    // commit b1755b8f8b66a0058529b3d0a3c42a88598a2b92
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     初始化React-electron项目
    
    //  .npmrc                             |   6 ++
    //  README.md                          |   4 +
    //  electron/main.ts                   |   2 +-
    //  package.json                       |   6 +-
    //  pnpm-lock.yaml                     | 160 +++++++++++++++++++++++++++++++++++++
    //  src/App.tsx                        |  38 ++++-----
    //  src/Contexts/index.tsx             |  27 +++++++
    //  src/components/mdui/theme.tsx      |  13 +++
    //  src/components/mdui/themeColor.tsx |  14 ++++
    //  src/main.tsx                       |  10 ++-
    //  src/page/index/index.tsx           |  30 +++++++
    //  src/router/index.tsx               |  11 +++
    //  src/types/MduiThemeType.ts         |   1 +
    //  src/vite-env.d.ts                  |   1 +
    //  14 files changed, 294 insertions(+), 29 deletions(-)
    
    // commit 4a102ddb88e9ffba0c1adbb4dc5d586c87ca9ae5
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     1111
    
    //  README_Z.md => README.md | 0
    //  1 file changed, 0 insertions(+), 0 deletions(-)
    
    // commit 5a44208e03062d2f25f2fca0ca703f3a24e8a7a0
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     1111
    
    //  README.md => README_Z.md | 0
    //  1 file changed, 0 insertions(+), 0 deletions(-)
    
    // commit 307f7548b22767ae826c18e7e2b3f615b14e2b43
    // Author: 张辉 <zhanghui@cdzhiyong.com>
    
    //     项目创建
    
    //  .eslintrc.cjs                    |   18 +
    //  .gitignore                       |   26 +
    //  README.md                        |   30 +
    //  electron-builder.json5           |   43 +
    //  electron/electron-env.d.ts       |   27 +
    //  electron/main.ts                 |   68 +
    //  electron/preload.ts              |   24 +
    //  index.html                       |   13 +
    //  package.json                     |   33 +
    //  pnpm-lock.yaml                   | 4022 ++++++++++++++++++++++++++++++++++++++
    //  public/electron-vite.animate.svg |   34 +
    //  public/electron-vite.svg         |   26 +
    //  public/vite.svg                  |    1 +
    //  src/App.css                      |   42 +
    //  src/App.tsx                      |   35 +
    //  src/assets/react.svg             |    1 +
    //  src/index.css                    |   68 +
    //  src/main.tsx                     |   15 +
    //  src/vite-env.d.ts                |    1 +
    //  tsconfig.json                    |   25 +
    //  tsconfig.node.json               |   11 +
    //  vite.config.ts                   |   29 +
    //  22 files changed, 4592 insertions(+)`));

  }
})