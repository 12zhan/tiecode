import { pinyin } from "pinyin-pro"

const key = [
    {
        name: "类",
        inner: `类
\t
结束 类`,
        postion: 10
    }, {
        name: "变量",
        inner: `变量`
    }
]




const KeyWord = ["类","方法","结束","跳出循环","退出循环","空","本对象","父对象","真","假","为","属性","变量","属性读","属性写","假如","定义事件","@code","@end","code"]

export const Completion = KeyWord.map(i=>{
    return {
        label: {
            label: pinyin(i, { toneType: "none" }),
            detail: i,
            description: '关键字',
            token: "variable.parameter.function"
        },
        documentation: 'Describe your library here',
        insertText: i
    }
})
