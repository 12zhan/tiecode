import { pinyin } from "pinyin-pro"

//基本关键字
const KeyWord = ["类", "方法", "结束", "跳出循环", "退出循环", "空", "本对象", "父对象", "真", "假", "为", "属性", "变量", "属性读", "属性写", "假如", "定义事件", "code"]

/**
 * @returns {Array<>}
 */
const CompletionObject = (monaco:any)=>KeyWord.map(i => {
    return {
        label: {
            label: pinyin(i, { toneType: "none" }),
            detail: i,
            description: 'keyworld'
        },
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: '结绳基本关键字',
        insertText: i
    }
})


/**
 * 注册基本代码补全
 * @param {string} languages 注册语言类型
 * @param {import("@monaco-editor/react").Monaco} monaco 
 */
export const Completion = (languages:any,monaco:any) => {
    monaco.languages.registerCompletionItemProvider(languages, {
        triggerCharacters:['.',''],
        provideCompletionItems: (model:any, position:any) => {
            console.log(position)
            return {
                suggestions: CompletionObject(monaco),
            }
        },
        resolveCompletionItem:(item:any,token:any)=>{
            //关键词触发
            console.log(item,token)
        }
    })
}