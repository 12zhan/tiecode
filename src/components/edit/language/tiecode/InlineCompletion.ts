
/**
 * 注册联补全
 * @param {string} languages 
 * @param {import("@monaco-editor/react").Monaco} monaco 
 */
export const InlineCompletion = (languages, monaco) => {
    monaco.languages.registerInlineCompletionsProvider(languages, {
        provideInlineCompletions: function (model, position) {
            return {
                items: [
                    {
                        label: {
                            label: '类',
                            detail: '额外信息的字符串',
                            description: '更详细的描述',
                        },
                        kind: monaco.languages.CompletionItemKind.Text,
                        documentation: 'Describe your library here',
                        insertText: '类\n\t弹出提示("Hello World")\n结束 类',
                        insertTextRules: 0,
                    },
                ],
            };
        },
        freeInlineCompletions(completion) {
        },
    })

}