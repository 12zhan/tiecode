import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { GitHubLight } from "./theme/GitHubLight";
import { GitHubDark } from "./theme/GitHubDark";
import tiecode, { LANGUAGES_NAME } from './language/tiecode'

function CodeEditor() {

    const [FontSize, _FontSize] = useState(18)
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

    }} options={{ fontSize: FontSize }}></Editor>
}

export default CodeEditor;
