# Electron暴露API
api暴露在全局window对象上
## 文件操作(file)
`window.file.Function(...arag)`
### 读取文件内容
```js
readFile(path:string):string
```
### 写入文件内容
```js
writeFile(path:string, content:string):void
```
### 创建文件夹
```js
mkdir(path:string):void
```
### 文件是否存在
```js
exists(path:string):boolean
```
### 删除文件
```js
unlink(path:string):void
```
### 删除文件夹
```js
rmdir(path:string):void
```
### 读取文件夹内容
```js
readDir(path:string):string[]
```
### 复制文件
```js
copyFile(src:string, dest:string):void
```
### 移动文件
```js
moveFile(src:string, dest:string):void
```

### 是否是文件
```js
isFile(path:string):boolean
```