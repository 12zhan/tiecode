import { useState } from "react"
import { randomString } from "../../utils/random"

interface CreateDialogProps {
    open: boolean,
    set: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateDialog = ({ open, set }: CreateDialogProps) => {


    const [_package] = useState(`com.${randomString()}`)

    return <>
        <mdui-dialog
            open={open}
        >

            <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <mdui-select variant="outlined" label="工程类型">
                    <mdui-menu-item value="item-1">
                        <img src="/ProjectType/console.svg" width={"25px"} alt="" />
                        结绳控制台
                    </mdui-menu-item>
                    <mdui-menu-item value="item-2">
                        <img src="/ProjectType/plugin.svg" width={"25px"} alt="" />
                        结绳插件
                    </mdui-menu-item>
                    <mdui-menu-item value="item-3">
                        <img src="/ProjectType/java.svg" width={"25px"} alt="" />
                        java控制台
                    </mdui-menu-item>
                </mdui-select>
                <mdui-text-field variant="outlined" label="工程名称"></mdui-text-field>
                <mdui-text-field variant="outlined" label="程序包名" value={_package}></mdui-text-field>
            </div>

            <mdui-button slot="action" variant="text" onClick={() => set(false)}>取消</mdui-button>
            <mdui-button slot="action" variant="tonal">创建</mdui-button>
        </mdui-dialog>
    </>
}

