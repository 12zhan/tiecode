import { createContext, useState } from "react";
import { useContext } from "react";
import { MduiThemeType } from "../types/MduiThemeType";

interface t{
    theme: MduiThemeType,
    setTheme: React.Dispatch<React.SetStateAction<MduiThemeType>>,
    themeColor: string,
    setThemeColor: React.Dispatch<React.SetStateAction<string>>
};

const Context = createContext<t>(null as any);


export const Provider = ({ children }:any) => {

    const [theme, setTheme] = useState<MduiThemeType>("dark")
    const [themeColor,setThemeColor] = useState("#0061A4")
    
    return <Context.Provider value={{theme,setTheme, themeColor,setThemeColor}}>
        {children}
    </Context.Provider>
}

export const useSharedData = () =>{
    return useContext(Context)
}
