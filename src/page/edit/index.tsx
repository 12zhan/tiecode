import {  useState } from "react"
import { FileTree } from "../../components/FileTree"
import CodeEditor from "../../components/edit"
import { useParams } from "react-router-dom"
import { project } from "../../types/electronInterface/project"

export const Editor = ({ }) => {

    const [FileOpen, setFileOpen] = useState(false)

    const [value,setValue] = useState("")

    const param = useParams()

    console.log(project.getFileList(param.path as string))
    

    return <>

        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            overflowY: "hidden"
        }}>


            <div style={{ display: "flex", width: "fit-content" }}>
                <div style={{
                    width: "60px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10px"
                }}>

                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}>

                        <mdui-button-icon icon="folder_open" onClick={() => setFileOpen(!FileOpen)}></mdui-button-icon>
                        <mdui-button-icon icon="search"></mdui-button-icon>
                        <mdui-button-icon>
                            <mdui-icon src="git.svg"></mdui-icon>
                        </mdui-button-icon>

                    </div>
                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end"
                    }}>

                        <mdui-button-icon icon="terminal"></mdui-button-icon>

                    </div>

                </div>
                

                {
                    FileOpen && <div style={{ flex: 1, height: "100%" }}>
                        <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", height: "20px" }}>
                            资源管理器
                        </div>
                        <FileTree path={param.path as string} onItemClick={(e)=>{setValue(project.readFile(e.type=="file" ? e.path : ""))}}/>
                    </div>
                }


            </div>



            <div style={{
                height: "100%",
                width: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}>

                <div style={{
                }}>
                    <mdui-tabs value="tab-1">
                        <mdui-tab value="tab-1">index.js</mdui-tab>
                        <mdui-tab value="tab-2">app.js</mdui-tab>
                        <mdui-tab value="tab-3">index.html</mdui-tab>
                    </mdui-tabs>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }}>
                    <CodeEditor value={value} />
                </div>
            </div>

        </div>


    </>
}