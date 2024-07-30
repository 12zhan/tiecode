import { Completion } from './Completion'
import {Highlight} from './Highlight'
import {InlineCompletion} from './InlineCompletion'
import {Error} from './Error'

export let LANGUAGES_NAME = "tiecode"

export default class tiecode{
    /**
     * 注册语言
     * @param {import('@monaco-editor/react').Monaco} monaco 
     */
    reg(editor,monaco){
        monaco.languages.register({ id: LANGUAGES_NAME })
        Highlight(LANGUAGES_NAME,monaco) //注册基本语法高亮
        Completion(LANGUAGES_NAME,monaco) //注册代码补全
        InlineCompletion(LANGUAGES_NAME,monaco) //注册内联补全
        Error(editor,monaco) //注册错误提示
    }
}