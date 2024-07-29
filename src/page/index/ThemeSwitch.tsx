"use client"

import {  useState } from "react"
import { useSharedData } from "../../Contexts"

interface ThemeSwitchProps {

}

export const ThemeSwitch = ({ }: ThemeSwitchProps) => {
    const { setTheme, theme } = useSharedData()
    const [Icon,setIcon] = useState("brightness_high") //brightness_4 | brightness_high

    const  SwitchTheme = ()=>{
        if(theme == "dark"){
            setTheme("light")
            setIcon("brightness_high")
        }else{
            setTheme("dark")
            setIcon("brightness_4")
        }
    }

    return <>
        <mdui-navigation-rail-item icon={Icon} onClick={() => SwitchTheme()}>白昼</mdui-navigation-rail-item>
    </>
}