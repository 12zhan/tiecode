import { useEffect, useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { GitHubLight } from "./theme/GitHubLight";
import { GitHubDark } from "./theme/GitHubDark";
import tiecode, { LANGUAGES_NAME } from './language/tiecode'

function CodeEditor() {

    const [FontSize, _FontSize] = useState(18)

    function init(monaco:Monaco){
        monaco.editor.addEditorAction({
            id:"run1",
            label:"运行 “Tie.t”",
            run() {
              console.log("结绳打包")  
            },
            contextMenuGroupId:"run",
        })

        monaco.editor.addEditorAction({
            id:"run1",
            label:"运行 “Tie.t”",
            run() {
              console.log("结绳打包")  
            },
            contextMenuGroupId:"run",
        })
    }

    useEffect(() => {

    }, [_FontSize])

    return <Editor height={"100%"} onMount={(editor,monaco)=>{
        {editor}
        monaco.editor.defineTheme("github-light", GitHubLight as any)   
        monaco.editor.defineTheme("github-dark", GitHubDark as any)
        monaco.editor.setTheme("github-light")

        const tie = new tiecode();
        tie.reg(editor,monaco)

        monaco.editor.setModelLanguage(editor.getModel() as any,LANGUAGES_NAME)

        init(monaco)

    }} options={{ fontSize: FontSize }}></Editor>
}

export default CodeEditor;
