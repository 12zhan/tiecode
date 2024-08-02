"use client"

import { useEffect, useState } from 'react'
import {  gitType, parseGitCommit, parseGitFileContentWhole } from './utils'

interface GitProps { }

export const Git = ({ }: GitProps) => {

    const [data, setData] = useState<Array<gitType>>()

    useEffect(() => {
        window.system.exec("git log -p").then(r => {
            setData(parseGitCommit(r.stdout) as any)
        })
    }, [setData])

    return <>
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", height: "20px" }}>
                Git
            </div>
            <div style={{
                width: "200px"
            }}>
                {data?.map((item, index) => {

                    parseGitFileContentWhole(item.files![0])

                    return <>
                        <div key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: "5px"
                            }}>
                            <mdui-button-icon style={{
                                width: 30,
                                height: 30,
                            }}>
                                <mdui-icon src="git.svg"></mdui-icon>
                            </mdui-button-icon>
                            <span style={{
                                fontSize: 12
                            }}>{item.message}</span>
                        </div>
                    </>
                })}
            </div>
        </div>

    </>
}