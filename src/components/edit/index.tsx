import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import {GitHubDark} from "./theme/GitHubDark.ts";

function CodeEditor() {

    const [FontSize, _FontSize] = useState(18)

    useEffect(() => {
    }, [_FontSize])

    return <Editor theme="github-dark" language="javascript" height={"100%"} onMount={(editor,monaco)=>{
        {editor}
        monaco.editor.defineTheme("github-dark", GitHubDark as any)
        monaco.editor.setTheme("github-dark")
    }} options={{ fontSize: FontSize }}></Editor>
}

export default CodeEditor;
