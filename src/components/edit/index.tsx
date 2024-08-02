import { useEffect, useState } from "react";
import { Editor, Monaco } from "@monaco-editor/react";
import { GitHubLight } from "./theme/GitHubLight";
import { GitHubDark } from "./theme/GitHubDark";
import tiecode, { LANGUAGES_NAME } from './language/tiecode'
import { useSharedData } from "../../Contexts";

function CodeEditor({value}:{value:string}) {

    const [FontSize, _FontSize] = useState(18)
    const { theme } = useSharedData()

    function init(monaco: Monaco) {

        //加载插件

        (window.plugin.loadPlugin("tiecode.Edit.editor.ActionMenu").regAction() as Array<any>).map(i => {
            monaco.editor.addEditorAction({
                id: i.token,
                label: i.name,
                run() {
                    i.action()
                },
                contextMenuGroupId: "run",
            })
        })
    }

    useEffect(() => {

    }, [_FontSize])

    return <Editor value={value} height={"100%"} width={"100%"} onMount={(editor, monaco) => {
        { editor }
        monaco.editor.defineTheme("github-light", GitHubLight as any)
        monaco.editor.defineTheme("github-dark", GitHubDark as any)

        monaco.editor.setTheme(theme == "light" ? "github-light" : "github-dark")

        const tie = new tiecode();
        tie.reg(editor, monaco)

        monaco.editor.setModelLanguage(editor.getModel() as any, LANGUAGES_NAME)

        init(monaco)

    }} options={{ fontSize: FontSize }}></Editor>
}

export default CodeEditor;
