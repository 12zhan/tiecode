import { useEffect, useRef } from "react";
import { Button as MduiButton } from 'mdui';
import { useSharedData } from "../../Contexts";

interface IndexProps {

}

const Index = ({ }: IndexProps) => {

    const {setTheme} = useSharedData()

    //ref
    const demoBt = useRef<MduiButton>(null)

    useEffect(() => {
        demoBt.current?.addEventListener('click', () => {
            setTheme("light")
        })
    }, [demoBt])

    return <>
        <div>
            <h1>Hello World</h1>
            <mdui-button ref={demoBt}>测试</mdui-button>
        </div>
    </>
}

export default Index;