
export interface ElectronApi {
  top():void
  max():void
  min():void
  close():void
  devtools():void
  require(path:string):any
}

export interface FileApi {
  readFile(path: string) : string
}

declare global {
  interface Window {
    electronAPI: ElectronApi
    fileAPI: FileApi
  }
}
