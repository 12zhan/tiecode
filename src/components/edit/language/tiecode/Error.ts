/**
 * 注册代码错误警告
 * @param {import("@monaco-editor/react").Monaco} monaco 
 */
export const Error = (editor,monaco) => {
    //错误提示
    let err = {
        message: 'unknow type',
        line: 4,
        column: 5,
        length: 5
    };

    let markers = [];
    if (err) {
        markers.push({
            startLineNumber: err.line,
            endLineNumber: err.line,
            startColumn: err.column,
            endColumn: err.column + err.length,
            message: err.message,
            severity: monaco.MarkerSeverity.Error,
        });
    }

    monaco.editor.setModelMarkers(editor.getModel(), "owner", markers)
}