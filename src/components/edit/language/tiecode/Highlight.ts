import { Monaco } from '@monaco-editor/react'


/**
 * 注册基本语法高亮
 * @param {string} languages 注册语言类型
 * @param {Monaco} monaco 
 */
export const Highlight = (languages,monaco) => {
    monaco.languages.setMonarchTokensProvider(languages, {
        tokenizer: {
            root: [
                [/类|方法|结束|跳出循环|退出循环|空|本对象|父对象|真|假|为|属性|变量|属性读|属性写|假如|定义事件|\@\code|\@\end|code/, { token: "keyword" }],
                //java关键字
                [/while|volatile|void|try|true|transient|throws|throw|this|synchronized|switch|super|strictfp|static|short|return|public|protected|private|package|null|new|native|long|interface|int|instanceof|import|implements|if|goto|for|float|finally|final|false|extends|enum|else|double|do|default|continue|const|class|char|catch|case|byte|break|boolean|assert|abstract|var|record|yield|sealed|non-sealed|permits|when/, { token: "keyword" }],
                [/\@.*/, { token: "keyword" }],
                [/\".*.\"/, { token: "string" }],
                [/\/\*.*/, "comment", '@commentT'], //多行注释开头
                [/\/\/.*/, "comment"], //单行注释
            ],
            commentT: [
                [/\*\//, 'comment', '@pop']
            ]
        }
    })
}