import { setColorScheme } from "mdui";
import { useSharedData } from "../../Contexts";



interface ThemeColorProps {
}

export const ThemeColor = ({}:ThemeColorProps) => {

    const {themeColor} = useSharedData()
    setColorScheme(themeColor);
    return null;
}