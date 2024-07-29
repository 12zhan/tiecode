import { useEffect, useState } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { CreateDialog } from "./CreateDialog";
import { WaterFall } from "./WaterFall";

interface IndexProps {

}

const Index = ({ }: IndexProps) => {

    const [isCreateDialog,setIsCreateDialog] = useState(false)

    //ref

    useEffect(() => {
    }, [])

    return <>
        <div style={{
            position: "relative",
            height: "100%", width: "100%"
        }}>
            <mdui-navigation-rail contained>
                <mdui-navigation-rail-item icon="code">代码</mdui-navigation-rail-item>
                <ThemeSwitch/>
                <mdui-navigation-rail-item icon="settings">设置</mdui-navigation-rail-item>

            </mdui-navigation-rail>
            <div style={{
                height: "100%",
                width: "100%",
            }}>

                <div style={{ position: "relative", height: "100%", width: "100%", }}>
                    <WaterFall/>
                    <mdui-fab icon="edit" style={{ position: "absolute", bottom: "50px", right: "50px" }} onClick={()=>setIsCreateDialog(true)}></mdui-fab>
                </div>



            </div>
        </div>

        <CreateDialog open={isCreateDialog} set={setIsCreateDialog}/>

    </>
}

export default Index;