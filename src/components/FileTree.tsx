"use client"

/**
 * 文件树组件
 */

import { useState } from "react"

type FileTreeItemType = 'file' | 'folder'

type FileTreeItemProps = {
    name: string,
    type: FileTreeItemType
    children?: Array<FileTreeItemProps>
}

interface FileTreeProps {
    data?: Array<FileTreeItemProps>
}

const FileTreeItem = ({ data }: { data: FileTreeItemProps }) => {


    const [isExpanded, setIsExpanded] = useState(false);

    // 切换文件夹的展开状态
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return <>
        <div style={{
            width: "fit-content",
            padding: '0px 5px'
        }}>

            <div
                onClick={toggleExpand}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                }}>

                <img src={data.type === 'file' ? "FileTypeIcon/file_type_typescript.svg" : isExpanded ? "FileTypeIcon/default_folder_opened.svg" : "FileTypeIcon/default_folder.svg"} alt="" width={"30px"} />

                <div>{data.name}</div>


            </div>

            {data.type === 'folder' && isExpanded && data.children && (
                <div style={{ marginLeft: '20px' }}>
                    {data.children.map((child, index) => (
                        <FileTreeItem key={index} data={child} />
                    ))}
                </div>
            )}

        </div>
    </>
}

export const FileTree = ({ }: FileTreeProps) => {
    const fileTreeData = [
        {
            name: 'src',
            type: 'folder',
            children: [
                {
                    name: 'index.tsx',
                    type: 'file'
                },
                {
                    name: 'components',
                    type: 'folder',
                    children: [
                        {
                            name: 'Header.tsx',
                            type: 'file'
                        },
                        {
                            name: 'Footer.tsx',
                            type: 'file'
                        }
                    ]
                },
                {
                    name: 'utils',
                    type: 'folder',
                    children: [
                        {
                            name: 'helpers.js',
                            type: 'file'
                        }
                    ]
                }
            ]
        }, {
            name: 'dist',
            type: 'folder'
        }, {
            name: 'public',
            type: 'folder',
            children: [
                {
                    name: 'index.html',
                    type: 'file'
                },
                {
                    name: 'manifest.json',
                    type: 'file'
                }
            ]
        }
    ];

    return <>
        <div>
            {fileTreeData.map((item, index) => (
                <FileTreeItem key={index} data={item as any} />
            ))}
        </div>
    </>
}

// src = {
//     item.type === 'file' ? "FileTypeIcon/file_type_typescript.svg" : "FileTypeIcon/default_folder.svg"
// }