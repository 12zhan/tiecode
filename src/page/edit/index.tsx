import CodeEditor from "../../components/edit"

export const Editor = ({ }) => {
    return <>
        <div style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column"
        }}>

            <div style={{
                height: "100%",
                width: "100%",
                display: "flex"
            }}>

                <div style={{
                    width: "60px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "10px"
                }}>

                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}>

                        <mdui-button-icon icon="folder_open"></mdui-button-icon>
                        <mdui-button-icon icon="search"></mdui-button-icon>
                        <mdui-button-icon>
                            <mdui-icon src="git.svg"></mdui-icon>
                        </mdui-button-icon>

                    </div>
                    <div style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end"
                    }}>

                        <mdui-button-icon icon="terminal"></mdui-button-icon>

                    </div>



                </div>

                <div style={{
                    height: "100%",
                    width: "100%"
                }}>

                    <div>
                        <mdui-tabs value="tab-1">
                            <mdui-tab value="tab-1">index.js</mdui-tab>
                            <mdui-tab value="tab-2">app.js</mdui-tab>
                            <mdui-tab value="tab-3">index.html</mdui-tab>
                        </mdui-tabs>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        height:"100%"
                    }}>
                        <CodeEditor />

                    </div>
                </div>




            </div>

        </div>

    </>
}