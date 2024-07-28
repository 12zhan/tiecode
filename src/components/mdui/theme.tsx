/**
 * 主题管理者
 */

import { setTheme } from "mdui";
import { useSharedData } from "../../Contexts";


export const Theme = () => {
    const {theme} = useSharedData()
    setTheme(theme);
    return null;
}