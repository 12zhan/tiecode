import { useEffect, useState } from "react";
import Editor, { Monaco } from '@monaco-editor/react'
import { GitHubDark } from "./theme/GitHubDark";

function CodeEditor() {

    const [FontSize, _FontSize] = useState(18)

    const handleEditorDidMount = (editor, monaco: Monaco) => {
        monaco.editor.defineTheme('github-dark', GitHubDark as any)
    }

    useEffect(() => {
    }, [_FontSize])

    return <Editor theme="github-dark" language="javascript" height={"100%"} onMount={handleEditorDidMount} options={{ fontSize: FontSize }}></Editor>
}

export default CodeEditor;
