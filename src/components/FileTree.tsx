"use client"

/**
 * 文件树组件
 */

import { useState } from "react"
import { FileTreeItemProps } from "../types/FileTreeItemProps";
import { project } from "../types/electronInterface/project";

interface FileTreeProps {
    path: string,
    onItemClick?: (item: FileTreeItemProps) => void
}

const FileTreeItem = ({ data,onItemClick }: { data: FileTreeItemProps,onItemClick?: (item: FileTreeItemProps) => void}) => {


    const [isExpanded, setIsExpanded] = useState(false);

    // 切换文件夹的展开状态
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return <>
        <div style={{
            width: "fit-content",
            padding: '0px 5px',
            borderLeft: `1px solid rgba(70,70,70,0.3)`,
        }}>

            <div
                onClick={toggleExpand}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                }}>

                <img src={data.type === 'file' ? "FileTypeIcon/file_type_typescript.svg" : isExpanded ? "FileTypeIcon/default_folder_opened.svg" : "FileTypeIcon/default_folder.svg"} alt="" width={"18px"} />

                <div onClick={onItemClick ? () => onItemClick(data) : undefined}>{data.name}</div>


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

export const FileTree = ({ path,onItemClick }: FileTreeProps) => {

    const fileTreeData = project.getFileList(path)

    return <>
        <div>
            {fileTreeData.map((item, index) => (
                <FileTreeItem key={index} data={item as any} onItemClick={onItemClick ? ()=> onItemClick(item as FileTreeItemProps) : undefined}/>
            ))}
        </div>
    </>
}

// src = {
//     item.type === 'file' ? "FileTypeIcon/file_type_typescript.svg" : "FileTypeIcon/default_folder.svg"
// }