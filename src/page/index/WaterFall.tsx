"use client"

import { useEffect, useRef, useState } from 'react';

interface WaterFallProps {
    // 如果有需要的属性，可以在这里定义
}

export const WaterFall = ({ }: WaterFallProps) => {
    const data = [1, 2, 3, 4, 5, 5, 6];
    const columnWidth = 160;
    const [columnGap, setColumnGap] = useState(20);
    const rowGap = 20;
    const [count, setCount] = useState(0);

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {


        if (container.current) {
            // 假设您想要基于容器宽度计算列的数量
            const columnCount = Math.floor(container.current.offsetWidth / (columnWidth + columnGap));
            setCount(columnCount);

            // setColumnGap(container.current.offsetWidth - (columnWidth * count) / (count -1))

        }

        window.addEventListener('resize', () => {
            if (container.current) {
                // 假设您想要基于容器宽度计算列的数量
                const columnCount = Math.floor(container.current.offsetWidth / (columnWidth + columnGap));

                setCount(columnCount);
                // 这里可以执行其他基于列数的操作
                // setColumnGap((container.current.offsetWidth - (columnWidth * count)) / (count -1))

                console.log('ColumnGap count:', setColumnGap);
            }
        })

    }, [columnWidth, columnGap, rowGap, container, setCount, setColumnGap]); // 移除了 count，因为它没有被使用

    return (
        <>
            <div
                className="container"
                ref={container} // 将 ref 附加到 div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflowY: "scroll"
                }}
            >
                {data.map((item, index) => {
                    const top = index === 0 ? 0 : (200 + rowGap) * Math.floor(index / count);
                    const left = index % count * (columnWidth + columnGap);

                    return (
                        <div
                            key={index} // 为每个元素添加一个唯一的 key
                            style={{
                                position: "absolute",
                                width: columnWidth,
                                height: "200px",
                                top: `${top}px`, // 转换为字符串
                                left: `${left}px` // 转换为字符串
                            }}
                        >

                            <mdui-card variant='filled' style={{width: "100%",height: "100%"}}>
                                {item}
                            </mdui-card>

                        </div>
                    );
                })}
            </div>
        </>
    );
};